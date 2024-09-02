import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to the Journaling App</h1>
            <div style={styles.buttonContainer}>
                <Link to="/login">
                    <button style={styles.button}>Login</button>
                </Link>
                <Link to="/signup">
                    <button style={styles.button}>Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};

export default Home;
