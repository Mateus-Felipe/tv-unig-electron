import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles.css';
import Header from './header.js';

{/* <audio id="meuAudio" src="/caminho/do/seu/arquivo-de-audio.mp3" onEnded={handleAudioEnd"></audio> */ }


function Content() {
    const [data, setData] = useState({
        matricula: {
            comum: 0,
            preferencial: 0
        },
        secretaria: {
            comum: 0,
            preferencial: 0
        },
        pagamentos: {
            comum: 0,
            preferencial: 0
        }
    });
    var comparisonData = {
        matricula: {
            comum: 0,
            preferencial: 0
        },
        secretaria: {
            comum: 0,
            preferencial: 0
        },
        pagamentos: {
            comum: 0,
            preferencial: 0
        }
    };
    const [loading, setLoading] = useState(false);
    const [intervalTime, setIntervalTime] = useState(0);
    const audioRef = useRef(null);
    let tic;
    var time = 0;

    const handleAudioEnd = () => {
        const audio = document.getElementById('meuAudio');
        audio.currentTime = 0;
        // console.log('Áudio terminou de ser reproduzido');
    };

    const reproduzirAudio = () => {
        // console.log(audioRef);
        // console.trace('reproduzirAudio chamada de:');
        const audio = document.getElementById('meuAudio');
        // audio.currentTime = 0;
        audio.addEventListener('error', function (e) {
            console.log('Erro ao carregar o áudio:', e);
        });
        audio.play();
    };


    useEffect(() => {
        // Defina a função que você deseja chamar a cada 7 segundos
        const fetch = async () => {
            if (loading) {
                return;
            } else {
                var playAudio = false;
                setLoading(true);
                await axios.get('https://partly-grown-koala.ngrok-free.app/ticket/all', {
                    headers: {
                        "ngrok-skip-browser-warning": 4
                    }
                })
                    .then(async response => {
                        var financeTickets = [];
                        var financeTicketsPre = [];
                        var secretaryTickets = [];
                        var secretaryTicketsPre = [];
                        var registerTickets = [];
                        var registerTicketsPre = [];
                        // ------------
                        var lastTicketRegister = null;
                        var lastTicketRegisterPre = null;
                        var lastTicketFinance = null;
                        var lastTicketFinancePre = null;
                        var lastTicketSecretary = null;
                        var lastTicketSecretaryPre = null;
                        // ------------
                        response.data.response_data.map((m) => {
                            if (m.sectorName === "Matricula" && m.isFinished === false && m.isWaiting === false) {
                                m.isPreferred ? registerTicketsPre.push(m) : registerTickets.push(m);
                            }
                            else if (m.sectorName === "Secretaria" && m.isFinished === false && m.isWaiting === false) {
                                m.isPreferred ? secretaryTicketsPre.push(m) : secretaryTickets.push(m);
                            }
                            else if (m.sectorName === "Financeiro" && m.isFinished === false && m.isWaiting === false) {
                                m.isPreferred ? financeTicketsPre.push(m) : financeTickets.push(m);
                            }
                        })

                        //* register --------------------------------------------------------------------
                        var preferred = false;
                        if (registerTickets.length === 1) {
                            lastTicketRegister = registerTickets[0].value;
                        } else if (registerTickets.length === 0) {
                            lastTicketRegister = 0;
                        } else {
                            lastTicketRegister = await registerTickets.reduce((anterior, atual) => {
                                return (anterior.value < atual.value) ? atual : anterior;
                            });
                        }
                        lastTicketRegister = lastTicketRegister.value ? lastTicketRegister.value : lastTicketRegister;
                        if (lastTicketRegister != 0 && data.matricula.comum != lastTicketRegister) {
                            playAudio = true;
                            blinkSector('secretary', 'bgReg', ' rgb(64, 154, 157)', 'regTitle', preferred);
                            // document.getElementById("reg").innerh1 = `${lastTicketRegister}`;
                        }
                        //* Preferêncial --------------------------------------------------------------------
                        if (registerTicketsPre.length === 1) {
                            lastTicketRegisterPre = registerTicketsPre[0].value;
                            // preferred = registerTickets[0].isPreferred;
                        } else if (registerTicketsPre.length === 0) {
                            lastTicketRegisterPre = 0;
                            preferred = false;
                        } else {
                            lastTicketRegisterPre = await registerTicketsPre.reduce((anterior, atual) => {
                                return (anterior.value < atual.value) ? atual : anterior; //! aaaaaaaaaaaaaaa//! aaaaaaaaaaaaaaa//! aaaaaaaaaaaaaaa
                            });
                        }
                        lastTicketRegisterPre = lastTicketRegisterPre.value ? lastTicketRegisterPre.value : lastTicketRegisterPre;
                        if (lastTicketRegisterPre != 0 && data.matricula.preferencial != lastTicketRegisterPre) {
                            playAudio = true;
                            blinkSector('register', 'bgRegPre', ' rgb(64, 154, 157)', 'regTitle', preferred);
                            // document.getElementById("regP").innerh1 = `${lastTicketRegisterPre}`;
                        }
                        //* Finance --------------------------------------------------------------------
                        var preferred = false;
                        if (financeTickets.length === 1) {
                            lastTicketFinance = financeTickets[0].value;
                        } else if (financeTickets.length === 0) {
                            lastTicketFinance = 0;
                        } else {
                            lastTicketFinance = await financeTickets.reduce((anterior, atual) => {
                                return (anterior.value < atual.value) ? atual : anterior;
                            });
                        }
                        lastTicketFinance = lastTicketFinance.value ? lastTicketFinance.value : lastTicketFinance;
                        if (lastTicketFinance != 0 && data.pagamentos.comum != lastTicketFinance) {
                            playAudio = true;
                            blinkSector('register', 'bgReg', ' rgb(64, 154, 157)', 'regTitle', preferred);
                            // document.getElementById("reg").innerh1 = `${lastTicketRegister}`;
                        }
                        //* Preferêncial --------------------------------------------------------------------
                        if (financeTicketsPre.length === 1) {
                            lastTicketFinancePre = financeTicketsPre[0].value;
                            // preferred = registerTickets[0].isPreferred;
                        } else if (financeTicketsPre.length === 0) {
                            lastTicketFinancePre = 0;
                            preferred = false;
                        } else {
                            lastTicketFinancePre = await financeTicketsPre.reduce((anterior, atual) => {
                                return (anterior.value < atual.value) ? atual : anterior; //! aaaaaaaaaaaaaaa//! aaaaaaaaaaaaaaa//! aaaaaaaaaaaaaaa
                            });
                        }
                        lastTicketFinancePre = lastTicketFinancePre.value ? lastTicketFinancePre.value : lastTicketFinancePre;
                        if (lastTicketFinancePre != 0 && data.pagamentos.preferencial != lastTicketFinancePre) {
                            playAudio = true;
                            blinkSector('register', 'bgRegPre', ' rgb(64, 154, 157)', 'regTitle', preferred);
                            // document.getElementById("regP").innerh1 = `${lastTicketRegisterPre}`;
                        }

                        //* Secretary --------------------------------------------------------------------
                        var preferred = false;
                        if (secretaryTickets.length === 1) {
                            lastTicketSecretary = secretaryTickets[0].value;
                        } else if (secretaryTickets.length === 0) {
                            lastTicketSecretary = 0;
                        } else {
                            lastTicketSecretary = await secretaryTickets.reduce((anterior, atual) => {
                                return (anterior.value < atual.value) ? atual : anterior;
                            });
                        }
                        lastTicketSecretary = lastTicketSecretary.value ? lastTicketSecretary.value : lastTicketSecretary;
                        if (lastTicketSecretary != 0 && data.secretaria.comum != lastTicketSecretary) {
                            playAudio = true;
                            blinkSector('register', 'bgReg', ' rgb(64, 154, 157)', 'regTitle', preferred);
                            // document.getElementById("reg").innerh1 = `${lastTicketRegister}`;
                        }
                        //* Preferêncial --------------------------------------------------------------------
                        if (secretaryTicketsPre.length === 1) {
                            lastTicketSecretaryPre = secretaryTicketsPre[0].value;
                            // preferred = registerTickets[0].isPreferred;
                        } else if (secretaryTicketsPre.length === 0) {
                            lastTicketSecretaryPre = 0;
                            preferred = false;
                        } else {
                            lastTicketSecretaryPre = await secretaryTicketsPre.reduce((anterior, atual) => {
                                return (anterior.value < atual.value) ? atual : anterior; //! aaaaaaaaaaaaaaa//! aaaaaaaaaaaaaaa//! aaaaaaaaaaaaaaa
                            });
                        }
                        lastTicketSecretaryPre = lastTicketSecretaryPre.value ? lastTicketSecretaryPre.value : lastTicketSecretaryPre;
                        if (lastTicketSecretaryPre != 0 && data.secretaria.preferencial != lastTicketSecretaryPre) {
                            playAudio = true;
                            blinkSector('register', 'bgRegPre', ' rgb(64, 154, 157)', 'regTitle', preferred);
                            // document.getElementById("regP").innerh1 = `${lastTicketRegisterPre}`;
                        }
                        var newData = {
                            matricula: {
                                comum: lastTicketRegister,
                                preferencial: lastTicketRegisterPre
                            },
                            secretaria: {
                                comum: lastTicketSecretary,
                                preferencial: lastTicketSecretaryPre
                            },
                            pagamentos: {
                                comum: lastTicketFinance,
                                preferencial: lastTicketFinancePre
                            }
                        }
                        // if (playAudio) {
                        console.table(comparisonData);
                        console.table(data);
                        console.table(newData);
                        if (
                            comparisonData.matricula.comum != newData.matricula.comum ||
                            comparisonData.matricula.preferencial != newData.matricula.preferencial ||
                            comparisonData.pagamentos.comum != newData.pagamentos.comum ||
                            comparisonData.pagamentos.preferencial != newData.pagamentos.preferencial ||
                            comparisonData.secretaria.comum != newData.secretaria.comum ||
                            comparisonData.secretaria.preferencial != newData.secretaria.preferencial
                        ) {
                            reproduzirAudio();
                        }
                        comparisonData = newData;
                        setData(newData);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            }
        }

        // Configure o intervalo para chamar a função a cada 7 segundos
        const intervalId = setInterval(fetch, 7000);

        // Limpe o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    // setInterval(async () => {
    //   // time = time + 1;
    //   await fetch();
    // }, 7000)

    function blinkSector(targetTo, secondTarget, originalColor, sectorName, preferred) {
        document.getElementById(targetTo).style.backgroundColor = '#bf7b00';
        document.getElementById(secondTarget).style.backgroundColor = '#bf7b00';
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = `${originalColor}`;
            // document.getElementById(sectorName).innerText = preferred ? 'Preferêncial' : document.getElementById(sectorName).textContent;
        }, 500);
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = '#bf7b00';
        }, 1000);
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = `${originalColor}`;
        }, 1500);
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = '#bf7b00';
        }, 2000);
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = `${originalColor}`;
        }, 2500);
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = '#bf7b00';
        }, 3000);
        setTimeout(function () {
            document.getElementById(targetTo).style.backgroundColor = `${originalColor}`;
            document.getElementById(secondTarget).style.backgroundColor = '#fff';
            document.getElementById(sectorName).innerText = sectorName === 'secTitle' ? 'Secretaria' : (sectorName === 'regTitle' ? 'Matrícula' : 'Pagamentos');
        }, 3500);
        return;
    }

    return (
        <div className="bgContainer" style={{ backgroundImage: `url(${require('./bg.png')})` }}>
            <div className="sectors">
                <div className="first">
                    <div id='secretary' className="firstSectorContainer sectorContainer" style={{ marginTop: 30, backgroundColor: '#59973e' }}>
                        <h1 className="firsth1Sector" style={{ color: '#fff', fontWeight: 'bold', fontSize: '40px' }}>Secretaria</h1>
                    </div>
                    <div className="second">
                        <h1 style={{ fontWeight: 'bold', color: '#fff', fontSize: '20px' }}>Comum</h1>
                        <div id='bgSec' className="firstNumberSector">
                            <h1 className="h1Value">{data.secretaria.comum}</h1>
                        </div>
                    </div>
                    <div className="second">
                        <h1 style={{ fontWeight: 'bold', color: '#fff', fontSize: '20px' }}>Preferencial</h1>
                        <div id='bgSecPre' className="firstNumberSector">
                            <h1 id="" className="h1Value">{data.secretaria.preferencial}</h1>
                        </div>
                    </div>
                </div>
                <div className="sectorContainer" style={{ marginTop: 30, backgroundColor: '#409a9d' }}>
                    <h1 className="h1Sector" id='register' style={{ color: '#fff', fontWeight: 'bold', fontSize: '40px' }}>Sala de Matricula</h1>
                    <div id='bgReg' className="numberSector">
                        <h1 className="h1Value">{data.matricula.comum}</h1>
                    </div>
                    <div id='bgRegPre' className="numberSector">
                        <h1 className="h1Value">{data.matricula.preferencial}</h1>
                    </div>
                </div>
                <div className='sectorContainer' style={{ marginTop: '30px', backgroundColor: '#a10000' }}>
                    <h1 className="h1Sector" id='payments' style={{ color: '#fff', fontWeight: 'bold', fontSize: '40px' }}>Pagamentos</h1>
                    <div id='bgPay' className="numberSector">
                        <h1 className="h1Value">{data.pagamentos.comum}</h1>
                    </div>
                    <div id='bgPayPre' className="numberSector">
                        <h1 className="h1Value">{data.pagamentos.preferencial}</h1>
                    </div>
                </div>
                <audio ref={audioRef} id='meuAudio' className="meuAudio" src="./tic.mp3" onEnded={handleAudioEnd}></audio>
            </div>
        </div>
    );
}

export default Content;
