import React from 'react';
import axiosInstance from './axios';

import Posts from './components/pageParts/Posts';
import Principal from './components/pageParts/Principal';
import Side from './components/pageParts/Side';
import IconAnimation from './components/pageParts/IconAnimation';

import Grid from "@material-ui/core/Grid";
import Pagination from '@mui/material/Pagination';
import Container from '@material-ui/core/Container';

import Media from 'react-media';

const API_ENDPOINT = 'http://127.0.0.1:8000/api/';

const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return { ...state, isLoading: true, isError: false, };
        case 'STORIES_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, data: action.payload };
        case 'STORIES_LASTS_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, lasts: action.payload };
        case 'STORIES_FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true, };
        default:
            throw new Error();
    };
};


const App = () => {
    const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], lasts: [], isLoading: false, isError: false, });
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    React.useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        async function fetchData() {
            try {
                const results = await axiosInstance.get(API_ENDPOINT + `?page=${page}`);
                setTotalPage(results.data.num_artigos);
                dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: results.data.data });

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
            {/* <Media queries={{
                small: "(max-width: 599px)",
                large: "(min-width: 900px)"
            }}>
                {matches => (
                    <React.Fragment>
                        {matches.small && const teste = '0px'}
                        {matches.large && const teste = '24px'}
                    </React.Fragment>
                )}
            </Media> */}
            <Container>
                <IconAnimation />
                {stories.lasts.length === 0 ? <h4 align='center'> No posts yet... </h4> : <Principal items={stories.lasts.slice(0, 5)} />}
                {stories.isLoading ? <h2 align='center' > Waiting for posts </h2> :
                    <React.Fragment>
                        <Grid container spacing={1}>
                            <Grid container spacing={1} item md={8}>
                                <Posts list={stories.data} />
                            </Grid>
                            <Grid item md={4} style={{ width: '100%'}}>
                                <Side />
                            </Grid>
                        </Grid>
                        <Pagination
                            style={{ display: 'flex', justifyContent: 'center', height: '15vh', width: '100%' }}
                            count={Math.round((totalPage / perPage))}
                            defaultPage={page}
                            color="secondary"
                            onChange={(event, value) => setPage(value)}
                        />
                    </React.Fragment>
                }
            </Container>
        </React.Fragment>
    );
};


export default App;
