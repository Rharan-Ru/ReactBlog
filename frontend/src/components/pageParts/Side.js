import React from 'react';
import axiosInstance from '../../axios';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import InstagramIcon from '@mui/icons-material/Instagram';

import { makeStyles } from "@material-ui/core/styles";

import useSound from 'use-sound';
import audio from '../audios/Bop.wav';
import audio2 from '../audios/Thunder.wav';
import audio3 from '../audios/Bubble.wav';
import audio4 from '../audios/Sword.mp3';
import audio5 from '../audios/Sword2.wav';


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
    const [data, setData] = React.useState({ weekData: [] });
    const [data2, setData2] = React.useState({ popularData: [] });
    React.useEffect(() => {
        async function fetchData() {
            try {
                await axiosInstance.get('week')
                    .then((res) => {
                        setData({ weekData: res.data });
                    });
                await axiosInstance.get('popular')
                    .then((res) => {
                        setData2({ popularData: res.data });
                    });
            }
            catch (error) {
                console.log(error)
            };
        };
        fetchData();
    }, []);


    return (
        <div className={classes.backgroundCard}>
            <Typography className={classes.titleHeader} align='center' gutterBottom variant="h5" component="div">
                Melhores da semana
            </Typography>
            {data.weekData.map(item => <CustomCard item={item} key={item.id + 'week'} />)}

            <Typography className={classes.titleHeader} align='center' gutterBottom variant="h5" component="div">
                Melhores de Todos
            </Typography>
            {data2.popularData.map(item => <CustomCard item={item} key={item.id + 'popular'} />)}
        </div>
    );
};


const CustomCard = ({ item }) => {
    const classes = useStyles();
    const [playbackRate, setPlaybackRate] = React.useState(1);
    const [play, { stop }] = useSound(audio5);

    return (
        <Link href={'http://localhost:3000/post/' + item.slug} color='textPrimary' underline='none'>
            <Card className={classes.customCard} onMouseEnter={() => play()}>
                <CardActionArea style={{ display: 'flex', overflow: 'visible' }}>
                    <Grid container style={{ overflow: 'visible', height: '12vh', width: '100%' }} >
                        <Grid item xs={4} style={{ width: '100%', overflow: 'visible' }} >
                            <CardMedia
                                className={classes.cardImage}
                                component="img"
                                image={'http://127.0.0.1:8000' + item.image}
                            />
                        </Grid>
                        <Grid item xs={8} style={{ width: '100%', height: '100%', overflow: 'visible' }} >
                            <Box className={classes.textBox}>
                                <Typography>{item.title}</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                </CardActionArea>
            </Card>
        </Link>
    );
};

export default Side