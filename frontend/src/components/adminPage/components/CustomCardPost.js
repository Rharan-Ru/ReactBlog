import React from "react";
import { Card, CardMedia, Grid, Link, Box, Typography, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import BasicMenu from "./BasicMenu";
import ParseHtml from "../../utils/ParseHtmlContent";


const useStyles = makeStyles((theme) => ({
    cardImagePost: {
        height: '12vh',
        objectFit: 'cover',
        overflow: 'hidden'
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
    truncate: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
}));


const CustomPostCard = ({ item, isAdmin }) => {
    const classes = useStyles();

    const [user, setUser] = React.useState();
    const local_access_token = localStorage.getItem('access_token')
    React.useEffect(() => {
        if (local_access_token) {
            const token = JSON.parse(atob(local_access_token.split('.')[1]));
            setUser(token.name);
        };
    }, [local_access_token]);
    
    return (
        <Card className={classes.customCardPost}>
            {String(user) === String(item.author) && 
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BasicMenu slug={item.slug} isAdmin={isAdmin} />
            </div>}
            {isAdmin === true && 
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BasicMenu slug={item.slug} isAdmin={isAdmin} isPub={item.status} />
            </div>}
            
            <CardActionArea style={{overflow: 'visible' }}>
                <Link href={'http://localhost:3000/post/' + item.slug} color='textPrimary' underline='none'>
                    <Grid container style={{ overflow: 'visible', height: '12vh'}} >
                        <Grid item xs={3} style={{ width: '100%', overflow: 'visible' }}>
                            <CardMedia
                                className={classes.cardImagePost}
                                component="img"
                                image={'http://127.0.0.1:8000' + item.image}
                                style={{ width: '100%'}}
                            />
                        </Grid>
                        <Grid item xs={9} style={{ width: '100%', height: '100%', overflow: 'visible' }} >
                            <Box className={classes.textBoxPost} style={{ width: '100%'}}>
                                <Typography>{item.title}</Typography>
                                <Typography variant="body2" className={classes.truncate}>{ParseHtml(item.content)}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Link>
            </CardActionArea>
        </Card >
    );
};

export default CustomPostCard;
