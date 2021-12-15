import React from 'react';
import {Categories} from '../utils/Categories';
import ParseHtml from '../utils/ParseHtmlContent';

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
        borderRadius: '10px',
    },
    truncate: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
    principal: {
        minHeight: '80vh',
        marginBottom: '16px',
    },
    customCard: {
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
        <Grid container spacing={1} className={classes.principal}>
            <Grid item md={6} style={{ width: '100%' }} >
                <CustomCard item={items[0]} heightCustom={'80vh'} />
            </Grid>
            <Grid container spacing={1} item md={6}>
                <Grid item sm={12} style={{ width: '100%'}}>
                    <CustomCard item={items[1]} heightCustom={'40vh'} />
                </Grid>
                <Grid item xs={6} style={{ width: '100%'}}>
                    <CustomCard item={items[2]} heightCustom={'39vh'} />
                </Grid>
                <Grid item xs={6} style={{ width: '100%'}}>
                    <CustomCard item={items[3]} heightCustom={'39vh'} />
                </Grid>
            </Grid>
        </Grid>
    );
};

const CustomCard = ({ item, heightCustom }) => {
    const classes = useStyles();
    return (
        <Card style={{ height: heightCustom, width: '100%' }} className={classes.customCard}>
            <CardActionArea>
                <Categories list={item.category_name} />
                <Link href={'post/' + item.slug} color='textPrimary' underline='none'>
                    <CardMedia
                        component="img"
                        image={'http://127.0.0.1:8000' + item.image}
                        style={{ height: heightCustom, borderRadius: '10px'}}
                    />
                    <Box className={classes.textBox}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body2" className={classes.truncate}>{ParseHtml(item.content)}</Typography>
                    </Box>
                </Link>
            </CardActionArea>
        </Card>
    );
};


export default Principal;