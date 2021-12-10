import React from 'react';

import { Box, Grid, Card, CardMedia, CardActionArea, Typography, Link } from "@material-ui/core/";
import { makeStyles } from '@material-ui/core';

import ParseHtml from '../utils/ParseHtmlContent';

import Media from 'react-media';


const useStyles = makeStyles((theme) => ({
    imageBackground: {
        background: "url('https://carbonmade-media.accelerator.net/30443284;640x266.jpeg') rgba(0, 0, 0, 0.8)",
        backgroundSize: 'contains',
        backgroundBlendMode: 'multiply',
        height: '25vh',
        padding: '0px',
        margin: '0px',
        width: '100%',
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
    textBoxPerfil: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        width: '100%',
        color: 'white',
        padding: '10px',
        transition: '500ms',
    },
    textBoxPost: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        color: 'black',
        padding: '10px',
        transition: '500ms',
    },
    customCardPost: {
        background: 'none',
        height: '12vh',
        width: '100%',
        boxShadow: "none",
        marginTop: '10px',
        transition: '500ms',
        '&:hover': {
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            // boxShadow: '1px 1px 20px 3px blue',
            transition: '1s',
            '& $textBoxPost': {
                color: 'white',
            },
        },
    },
    cardImagePost: {
        height: '12vh',
        objectFit: 'cover',
        overflow: 'hidden'
    },
    truncate: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
}));


const PerfilAdmin = ({ list }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.imageBackground}>
            </div>
            <Box style={{ padding: '0 20px' }}>
                <Media queries={{
                    small: "(max-width: 599px)",
                    medium: "(min-width: 600px) and (max-width: 899px)",
                    large: "(min-width: 900px)"
                }}>
                    {matches => (
                        <React.Fragment>
                            {matches.small && <CustomCardPerfil name={'Monke'} admin={'Super User'} image={'https://source.unsplash.com/random/'} wid={'100%'} />}
                            {matches.medium && <CustomCardPerfil name={'Monke'} admin={'Super User'} image={'https://source.unsplash.com/random/'} wid={'100%'} />}
                            {matches.large && <CustomCardPerfil name={'Monke'} admin={'Super User'} image={'https://source.unsplash.com/random/'} wid={'30%'} />}
                        </React.Fragment>
                    )}
                </Media>
                <Media queries={{
                    small: "(max-width: 599px)",
                    medium: "(min-width: 600px) and (max-width: 899px)",
                    large: "(min-width: 900px)"
                }}>
                    {matches => (
                        <React.Fragment>
                            {matches.small &&
                                <div style={{ float: 'left', width: '100%' }}>
                                    {list.map(item => <CustomPostCard item={item} key={item.id} />)}
                                </div>}

                            {matches.medium &&
                                <div style={{ float: 'left', width: '100%' }}>
                                    {list.map(item => <CustomPostCard item={item} key={item.id} />)}
                                </div>}

                            {matches.large &&
                                <div style={{ float: 'left', width: '70%' }}>
                                    <Typography variant='h5'>Admin Page - Lasts Posts</Typography>
                                    {list.map(item => <CustomPostCard item={item} key={item.id} />)}
                                </div>}
                        </React.Fragment>
                    )}
                </Media>
            </Box>
        </React.Fragment>
    );
};


const CustomCardPerfil = ({ name, admin, image, wid }) => {
    const classes = useStyles();

    return (
        <div style={{ float: 'right', width: wid, }}>
            <Card className={classes.cardImagePerfil}>
                <CardMedia
                    component="img"
                    image={image}
                    style={{ width: '100%', height: '100%', padding: '7px' }}
                />
                <Box className={classes.textBoxPerfil}>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body2">{admin}</Typography>
                </Box>
            </Card>
        </div>
    );
}

const CustomPostCard = ({ item }) => {
    const classes = useStyles();
    return (
        <Link href={item.slug} color='textPrimary' underline='none'>
            <Card className={classes.customCardPost}>
                <CardActionArea style={{ display: 'flex', overflow: 'visible' }}>
                    <Grid container style={{ overflow: 'visible', height: '12vh', width: '100%' }} >
                        <Grid item xs={3} style={{ width: '100%', overflow: 'visible' }}>
                            <CardMedia
                                className={classes.cardImagePost}
                                component="img"
                                image={'http://127.0.0.1:8000' + item.image}
                            />
                        </Grid>
                        <Grid item xs={9} style={{ width: '100%', height: '100%', overflow: 'visible' }} >
                            <Box className={classes.textBoxPost}>
                                <Typography>{item.title}</Typography>
                                <Typography variant="body2" className={classes.truncate}>{ParseHtml(item.content)}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default PerfilAdmin;