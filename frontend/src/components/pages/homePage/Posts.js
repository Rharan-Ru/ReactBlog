import React from 'react';
import moment from 'moment';
import { Categories } from '../../utils/Categories';

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import VisibilityIcon from '@mui/icons-material/Visibility';

import { makeStyles } from "@material-ui/core/styles";
import ParseHtml from '../../utils/ParseHtmlContent';

const useStyles = makeStyles((theme) => ({
    truncate: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        transition: '500ms',
    },
    textBox: {
        position: 'absolute',
        color: 'white',
        height: '15vh',
    },
    customCard: {
        boxShadow: "none",
        overflow: 'visible',
        '&:hover': {
            '& $textHov, $truncate': {
                transition: '500ms',
                color: '#e10735',
            },
        },
    },
    cardBackground: {
        height: '150px',
        backgroundColor: '#3f51b5',
        background: "url('https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg'), linear-gradient(#000000, #f88296)",
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: 'white',
        borderRadius: '0 0 10px 10px'
    },
    textHov: {
        transition: '500ms',
        margin: '0px'
    },
}));


const Posts = ({ list }) => {
    return (
        <React.Fragment>
            {list.map(item => <Item key={item.id} item={item} />)}
        </React.Fragment>
    );
};


const Item = ({ item }) => {
    const classes = useStyles();
    return (
        <Grid item lg={6} sm={6} style={{ width: '100%' }}>
            <Card className={classes.customCard} style={{ width: '100%', borderRadius: '10px' }}>
                <CardActionArea>
                    <Categories list={item.category_name} />
                    <Link className={classes.link} href={'post/' + item.slug} color='textPrimary' underline='none'>
                        <CardMedia
                            component="img"
                            height='200'
                            image={'http://127.0.0.1:8000' + item.image}
                            style={{ borderRadius: '10px 10px 0 0' }}
                            
                        />
                        <CardContent className={classes.cardBackground}>
                            <Typography variant="body2" style={{ color: 'white' }}> {moment(item.published_date).format('llll')} </Typography>
                            <Grid container style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                <Grid item>
                                    <VisibilityIcon style={{ fontSize: '20px', }}></VisibilityIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" style={{ marginLeft: '10px' }}> {item.views} Views</Typography>
                                </Grid>
                            </Grid>
                            <Box className={classes.textBox}>
                                <Typography className={classes.textHov} gutterBottom variant="h5" component="div">{item.title}</Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.truncate}
                                    component="div">
                                    {ParseHtml(item.content)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
        </Grid>
    );
};


export default Posts;