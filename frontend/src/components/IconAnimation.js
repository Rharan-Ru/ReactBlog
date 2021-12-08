import React from 'react';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    contIcons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '15vh',
        width: '100%',
        // background: "url('https://carbonmade-media.accelerator.net/30443284;640x266.jpeg') rgba(0, 0, 0, 0.5)",
        // backgroundSize: 'contains',
        // backgroundBlendMode: 'multiply',
    },
    icon: {
        transition: 'ease-in-out 1.5s',
        color: 'purple',
        borderRadius: '50%',
        backgroundColor: '#000000',
        '&:hover': {
            transition: '0s',
            color: '#55D0E0',
            animation: '$upIcon 1.5s ease-in-out infinite',
            filter: 'drop-shadow(0 0 .5rem #55D0E0)'
        },
    },
    '@keyframes upIcon': {
        '0%': {
            transform: 'translateY(0px)',
        },
        '50%': {
            transform: 'translateY(-10px)',
        },
        '100%': {
            transform: 'translateY(0px)',
        },
    },
}));


const IconAnimation = () => {
    const classes = useStyles();

    return (
        <div className={classes.contIcons}>
            <ul style={{textAlign: 'center', overflowX: 'auto', overflowY: 'hidden', padding: '0px', margin: '0px', whiteSpace: 'nowrap', width: '100%', padding: '10px'}}>
                {[...Array(10)].map((x, i) => 
                    <li style={{display: 'inline-block'}} key={i}>
                        <AutoAwesomeIcon className={classes.icon}  style={{fontSize: '55px', padding:'10px', margin: '0 5px 0 5px'}} />
                        <p style={{margin: '0px'}}>teste</p>
                    </li>
                )}
            </ul>
        </div>
    );
};


export default IconAnimation;