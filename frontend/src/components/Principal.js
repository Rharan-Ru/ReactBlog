import React from 'react';
import Categories from './Categories';
import ParseHtml from './ParseHtmlContent';

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    textBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        color: 'white',
        padding: '10px',
        transition: '500ms',
    },
    truncate: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
    principal: {
        minHeight: '100vh',
    },
    customCard: {
        padding: '4px', 
        boxShadow: "none",
        overflow: 'visible',
        '&:hover': {
            '& $textBox': {
                backgroundColor: 'rgba(85, 208, 224, 0.84)',
                color: '#e10735',
                transition: '500ms',
            },
        },
    }
}));


const Principal = ({ items }) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.principal}>
            <Grid item md={6} style={{width: '100%'}} >
                <CustomCard item={items[0]} heightCustom={'100vh'} />
            </Grid>
            <Grid container item md={6} style={{width: '100%'}}>
                <Grid item sm={12} style={{width: '100%',}}>
                    <CustomCard item={items[1]} heightCustom={'50vh'} />
                </Grid>
                <Grid item xs={6} style={{width: '100%'}}>
                    <CustomCard item={items[2]} heightCustom={'50vh'} />
                </Grid>
                <Grid item xs={6} style={{width: '100%'}}>
                    <CustomCard item={items[3]} heightCustom={'50vh'} />
                </Grid>
            </Grid>
        </Grid>
    );
};

const CustomCard = ({ item, heightCustom }) => {
    const classes = useStyles();
    return (
        <Card style={{ height: `${heightCustom}`, width: '100%'}} className={classes.customCard}>
            <Link className={classes.link} href={'post/' + item.slug} color='textPrimary' underline='none'>
                <CardActionArea >
                    <CardMedia
                        component="img"
                        image='https://geekdama.com.br/wp-content/uploads/2020/06/one-piece-bando-wano-postcover-800x450.jpg'
                        style={{ height: `${heightCustom}`}}
                    />
                    <Categories list={item.category_name} />
                    <Box className={classes.textBox}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body2" className={classes.truncate}>{ParseHtml(item.content)}</Typography>
                    </Box>
                </CardActionArea>
            </Link>
        </Card>
    );
};


export default Principal;