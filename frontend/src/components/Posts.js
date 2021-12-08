import React from 'react';
import moment from 'moment';
import Categories from './Categories';

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
import ParseHtml from './ParseHtmlContent';

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
        padding: '0 4px 0 4px',
        boxShadow: "none",
        overflow: 'visible',
        '&:hover': {
            '& $textHov, $truncate': {
                transition: '500ms',
                color: '#e10735',
            },
        },
    },
    textHov: {
        transition: '500ms',
        margin: '0px'
    },
}));


const Posts = ({ list }) => {
    return (
        <div style={{ width: '100%' }}>
            {list.map(item => <Item key={item.id} item={item} />)}
        </div>
    );
};


const Item = ({ item }) => {
    var img = 'https://source.unsplash.com/random/';
    const classes = useStyles();
    return (
        <Card className={classes.customCard} style={{ width: '100%' }}>
            <Link className={classes.link} href={'post/' + item.slug} color='textPrimary' underline='none'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height='150'
                        image={img}
                        style={{ borderRadius: '10px 10px 0 0' }}
                    />
                    <Categories list={item.category_name} />
                    <CardContent style={{ height: 150, backgroundColor: '#312e2e', color: 'white', borderRadius: '0 0 10px 10px' }}>
                        <Typography > {moment(item.published_date).format('llll')} </Typography>
                        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item>
                                <VisibilityIcon style={{ fontSize: '20px', }}></VisibilityIcon>
                            </Grid>
                            <Grid item>
                                <Typography style={{ marginLeft: '10px' }}> {item.views} Views</Typography>
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
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Link>
        </Card>
    );
};


export default Posts;