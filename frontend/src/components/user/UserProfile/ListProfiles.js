import React from "react";
import { Card, CardMedia, Grid, Link, Box, Typography, CardActionArea, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import axiosInstance from "../../../axios";


const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return { ...state, isLoading: true, isError: false, };
        case 'STORIES_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, data: action.payload };
        case 'STORIES_FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true, };
        default:
            throw new Error();
    };
};


const useStyles = makeStyles((theme) => ({
    cardImagePost: {
        height: '12vh',
        objectFit: 'cover',
        overflow: 'hidden'
    },
    textBoxPost: {
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
}));


const ListUsersProfiles = () => {
    const [users, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false, });

    React.useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        async function fetchData() {
            try {
                const results = await axiosInstance.get('users/profiles/');
                console.log(results.data);
                dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: results.data });
            }
            catch (error) {
                console.error(error);
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
            };
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <Container>
                <Typography variant='h5' style={{margin: '10px 0'}}>
                    All Users - 0{users.data.length}
                </Typography>
                {users.data.map(item => <UsersCard key={item.slug} item={item} />)}
            </Container>
        </React.Fragment>
    );
};


const UsersCard = ({ item }) => {
    const classes = useStyles();
    return (
        <Card className={classes.customCardPost}>
            <CardActionArea>
                <Link href={item.slug} color='textPrimary' underline='none'>
                    <Grid container style={{ overflow: 'visible', height: '12vh', width: '100%' }} >
                        <Grid item xs={3} style={{ width: '100%', overflow: 'visible' }}>
                            <CardMedia
                                className={classes.cardImagePost}
                                component="img"
                                image={item.image}
                            />
                        </Grid>
                        <Grid item xs={9} style={{ width: '100%', height: '100%', overflow: 'visible' }} >
                            <Box className={classes.textBoxPost}>
                                <Typography>{item.username}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Link>
            </CardActionArea>
        </Card >
    );
};

export default ListUsersProfiles;
