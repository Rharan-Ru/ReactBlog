import React from 'react';
import axiosInstance from './axios';

import Posts from './components/pageParts/Posts';
import Principal from './components/pageParts/Principal';
import Side from './components/pageParts/Side';
import IconAnimation from './components/pageParts/IconAnimation';

import Grid from "@material-ui/core/Grid";
import Pagination from '@mui/material/Pagination';
import Container  from '@material-ui/core/Container';


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
            <Container>
                {stories.isLoading ? <h2 align='center' > Loading Posts </h2> :
                    <div>
                        <div>
                            <ul>
                                {stories.data.map(item => <li key={item.id}>{item.title}</li>)}
                            </ul>
                        </div>
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


export default AdminPage;
