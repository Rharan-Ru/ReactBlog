import React from 'react';
import axiosInstance from './axios';

import './App.css';
import Posts from './components/Posts';
import Principal from './components/Principal';
import Side from './components/Side';
import IconAnimation from './components/IconAnimation';

import Grid from "@material-ui/core/Grid";
import Pagination from '@mui/material/Pagination';
import Container  from '@material-ui/core/Container';


const API_ENDPOINT = 'http://127.0.0.1:8000/api/';

const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return { ...state, isLoading: true, isError: false, };
        case 'STORIES_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, data: action.payload };
        case 'STORIES_WEEK_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, weekData: action.payload };
        case 'STORIES_POPULAR_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, popularData: action.payload };
        case 'STORIES_LASTS_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, lasts: action.payload };
        case 'STORIES_FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true, };
        default:
            throw new Error();
    };
};


const App = () => {
    const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], weekData: [], popularData: [], lasts: [], isLoading: false, isError: false, });
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    React.useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        async function fetchData() {
            try {
                const results = await axiosInstance.get(API_ENDPOINT + `?page=${page}`);
                setTotalPage(results.data.num_artigos);
                dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: results.data.data });

                if (stories.weekData.length === 0) {
                    const weekResults = await axiosInstance.get(API_ENDPOINT + 'week');
                    const popularResults = await axiosInstance.get(API_ENDPOINT + 'popular');
                    dispatchStories({ type: 'STORIES_WEEK_FETCH_SUCCESS', payload: weekResults.data });
                    dispatchStories({ type: 'STORIES_POPULAR_FETCH_SUCCESS', payload: popularResults.data });
                };

                if (stories.lasts.length === 0) {
                    const lastPosts = await axiosInstance.get(API_ENDPOINT);
                    console.log(lastPosts.data.lasts)
                    dispatchStories({ type: 'STORIES_LASTS_FETCH_SUCCESS', payload: lastPosts.data.lasts });
                };

            }
            catch (error) {
                console.error(error);
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
            };
        };
        fetchData();
    }, [page]);
    const perPage = 5;
    return (
        <React.Fragment>
            <Container>
                <IconAnimation />
                {stories.lasts.length === 0 ? <h4 align='center'> No posts yet... </h4> : <Principal items={stories.lasts.slice(0, 5)} />}
                {stories.isLoading ? <h2 align='center' > Waiting for posts </h2> :
                    <div>
                        <Grid container style={{ width: '100%', marginTop: '5vh' }}>
                            <Grid item md={8} style={{width: '100%'}}>
                                <Posts list={stories.data} />
                            </Grid>
                            <Grid item md={4} style={{width: '100%'}}>
                                <Side list={stories.weekData.slice(0, 5)} popular={stories.popularData.slice(0, 5)} />
                            </Grid>
                        </Grid>
                        <Pagination
                            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                            count={Math.round((totalPage / perPage))}
                            defaultPage={page}
                            color="secondary"
                            onChange={(event, value) => setPage(value)}
                        />
                    </div>
                }
            </Container>
        </React.Fragment>
    );
};


export default App;
