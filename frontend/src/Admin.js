import React from 'react';
import axiosInstance from './axios';

import PerfilAdmin from './components/adminPage/adminPerfil';

import Pagination from '@mui/material/Pagination';
import Container from '@material-ui/core/Container';


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


const AdminPage = () => {
    const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false, });
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    React.useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        async function fetchData() {
            try {
                const results = await axiosInstance.get(`admin/?page=${page}`);
                setTotalPage(results.data.num_artigos);
                dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: results.data.data });

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
            <Container style={{ padding: '0px', margin: '0px' }}>
                {stories.isLoading ? <h2 align='center' > Loading Posts </h2> : <PerfilAdmin list={stories.data} />}
            </Container>
            <Pagination
                style={{ display: 'flex', justifyContent: 'center', height: '15vh', width: '100%' }}
                count={Math.round((totalPage / perPage))}
                defaultPage={page}
                color="secondary"
                onChange={(event, value) => setPage(value)}
            />
        </React.Fragment>
    );
};


export default AdminPage;
