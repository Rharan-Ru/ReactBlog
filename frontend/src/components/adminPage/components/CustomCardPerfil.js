import React from "react";
import { makeStyles } from "@material-ui/core";
import { Card, CardMedia, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    textBoxPerfil: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        width: '100%',
        color: 'white',
        padding: '10px',
        transition: '500ms',
    },
    cardImagePerfil: {
        position: 'relative',
        height: '40vh',
        objectFit: 'cover',
        borderRadius: '10px',
        width: '100%',
        border: 'none',
        boxShadow: "none",
        top: '0',
        marginTop: '-99px',
        backgroundColor: 'black',
        animation: '$fade 5s linear infinite',
    },
    '@keyframes fade': {
        '0%': {
            boxShadow: '',
        },
        '50%': {
            boxShadow: '0 0 10px 1px #fff, 0 0 15px 2px #f0f, 0 0 20px 3px #0ff',
        },
        '100%': {
            boxShadow: '',
        },
    },
}));


const CustomCardPerfil = ({ name, admin, image, wid }) => {
    const classes = useStyles();
    return (
        <div style={{ float: 'right', width: wid, }}>
            <Card className={classes.cardImagePerfil}>
                <CardMedia
                    component="img"
                    image={'http://127.0.0.1:8000' + image}
                    style={{ width: '100%', height: '100%', padding: '7px' }}
                />
                <Box className={classes.textBoxPerfil}>
                    <Typography variant="h5">{name}</Typography>
                    {admin && <Typography variant="body2">God super user</Typography>}
                </Box>
            </Card>
        </div>
    );
};

export default CustomCardPerfil;
