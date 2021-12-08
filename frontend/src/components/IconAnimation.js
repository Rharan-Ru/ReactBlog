import React from 'react';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    contIcons: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '10vh',
        width: '100%',
        display: 'flex',
        padding: '10px',
        marginTop: '4px',
        background: "url('https://carbonmade-media.accelerator.net/30443284;640x266.jpeg') rgba(0, 0, 0, 0.5)",
        backgroundSize: 'contains',
        backgroundBlendMode: 'multiply',
        overflowX: 'auto',
        overflowY: 'hidden',
    },
    icon: {
        display: 'flex',
        marginRight: '10px',
        transition: 'ease-in-out 1.5s',
        padding: '5px',
        color: 'purple',
        borderRadius: '50%',
        backgroundColor: '#000000',
        '&:hover': {
            transition: '0s',
            color: '#55D0E0',
            animation: '$upIcon 1.5s ease-in-out infinite',
            filter: 'drop-shadow(0 0 2rem crimson)'
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
            {[...Array(10)].map((x, i) => 
                <AutoAwesomeIcon className={classes.icon}  style={{fontSize: '60px', padding:'10px'}} key={i} />
            )}
        </div>
    );
};


export default IconAnimation;