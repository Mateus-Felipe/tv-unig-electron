import React from 'react';
import logoSource from './logo.png';

const Header = () => {
    return (
        <div style={styles.container}>
            <div style={styles.title}>Aguarde ser chamado</div>
            <img src={logoSource} alt="Logo" style={styles.logo} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#2570A4',
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 24,
    },
    logo: {
        height: 65,
        width: 150,
    },
};

export default Header;
