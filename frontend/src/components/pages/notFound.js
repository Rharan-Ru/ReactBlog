import React from "react";

const NotFound = () => {
    return (
        <div style={{height: '100vh', backgroundColor: 'black', color: 'white', padding: '10px',}}>
            <h1 style={{margin: '0px', marginTop: '30px', display: 'flex', justifyContent: 'center', fontSize: '200px', color: '#55D0E0', height: '35vh'}}>404</h1>
            <p style={{display: 'flex', justifyContent: 'center', margin: '0px', wordSpacing: '10px', fontSize: '30px'}}>Page not found!</p>
        </div>
    );
};

export default NotFound;