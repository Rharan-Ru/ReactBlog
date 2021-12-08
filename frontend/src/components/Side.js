import React from 'react';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import InstagramIcon from '@mui/icons-material/Instagram';

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    textBox: {
        display: 'flex',
        width: '100%',
        color: 'white',
        padding: '10px',
        transition: '500ms',
    },
    titleHeader: {
        height: '10vh',
        color: 'white', 
        padding: '4px', 
        margin: '0',
        display: 'flex',
        alignItems: 'center',
    },
    customCard: {
        background: 'none',
        height: '12vh', 
        width: '100%', 
        boxShadow: "none", 
        marginTop: '10px',
        '&:hover': {
            '& $textBox': {
                transition: '500ms',
                color: '#e10735',
            },
            '& $cardImage': {
                filter: 'drop-shadow(10rem 0 3rem rgba(85, 208, 224))',
                transition: '1s',
            },
        },
    },
    backgroundCard: {
        background: "url('https://carbonmade-media.accelerator.net/30443284;640x266.jpeg') rgba(0, 0, 0, 0.8)",
        backgroundSize: 'contains',
        backgroundBlendMode: 'multiply',
        borderRadius: '10px 10px 10px 10px',
        padding: '10px'
    },
    cardImage: {
        height: '12vh', 
        objectFit: 'cover', 
        borderRadius: '10px', 
        overflow: 'hidden'
    },
}));


const Side = ({ list, popular }) => {
    const classes = useStyles();
    return (
        <div className={classes.backgroundCard}>
            <Typography className={classes.titleHeader} align='center' gutterBottom variant="h5" component="div">
                Melhores da semana
            </Typography>
            {list.map(item => <CustomCard item={item} key={item.id} />)}

            <Typography className={classes.titleHeader} align='center' gutterBottom variant="h5" component="div">
                Melhores de Todos
            </Typography>
            {popular.map(item => <CustomCard item={item} key={item.id} />)}

            <Typography className={classes.titleHeader} align='center' gutterBottom variant="h5" component="div">
                Nos Siga!
            </Typography>
            <div>
                <ul style={{padding: '0px', margin: '0px', width: '100%'}}>
                    <li style={{display: 'flex'}}>
                        <InstagramIcon style={{color: 'white'}} />
                        <span style={{color: 'white'}}>Instagram</span>
                    </li>
                    <li style={{display: 'flex'}}>
                        <InstagramIcon style={{color: 'white'}} />
                        <span style={{color: 'white'}}>Instagram</span>
                    </li>
                    <li style={{display: 'flex'}}>
                        <InstagramIcon style={{color: 'white'}} />
                        <span style={{color: 'white'}}>Instagram</span>
                    </li>
                    <li style={{display: 'flex'}}>
                        <InstagramIcon style={{color: 'white'}} />
                        <span style={{color: 'white'}}>Instagram</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};


const CustomCard = ({ item }) => {
    const classes = useStyles();
    return (
        <Card className={classes.customCard}>
            <CardActionArea style={{display: 'flex', overflow: 'visible'}}>
                <Grid container style={{overflow: 'visible', height: '12vh', width: '100%'}} >
                    <Grid item xs={4} style={{width: '100%', overflow: 'visible'}} >
                        <CardMedia
                            className={classes.cardImage}
                            component="img"
                            image={'http://127.0.0.1:8000' + item.image}
                        />
                    </Grid>
                    <Grid item xs={8} style={{width: '100%', height: '100%', overflow: 'visible'}} >
                        <Box className={classes.textBox}>
                            <Typography>{item.title}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
};

export default Side