import React from "react";
import Side from '../pageParts/Side';
import { Categories } from "../utils/Categories";

import axiosInstance from '../../axios';
import parseHtmlContent from '../utils/ParseHtmlContent';
import { useParams } from 'react-router-dom';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import { makeStyles } from "@material-ui/core/styles";

import InfiniteScroll from "react-infinite-scroll-component";


const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

const useStyles = makeStyles((theme) => ({
    textBox: {
        width: '100%',
        height: '100%',
        padding: '10px',
        transition: '500ms',
    },
    customCard: {
        background: 'none',
        height: '27vh',
        width: '100%',
        boxShadow: "none",
        marginBottom: '10px',
        overflow: 'visible',
        '&:hover': {
            '& $textBox': {
                color: '#e10735',
            },
        },
    },
    cardImage: {
        height: '27vh',
        objectFit: 'cover',
        borderRadius: '10px 0 0 10px',
        overflow: 'hidden'
    },
    truncate: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 4,
        wordBreak: "break-all",
        overflow: "hidden",
    },
}));


const ListCategories = ({ }) => {
    const [data, setData] = React.useState({
        posts: [],
    });

    const [hasMore, setHasMore] = React.useState(true)
    const [index, setIndex] = React.useState(1)
    const { categoria } = useParams();

    React.useEffect(() => {
        axiosInstance.get('category/' + categoria + '/' + index).then((res) => {
            const allPosts = res.data;
            setData({ posts: allPosts });
            console.log(res.data);
        });
    }, []);

    async function FetchMoreData() {
        const newIndex = index + 1;
        await axiosInstance.get('category/' + categoria + '/' + newIndex).then((res) => {
            setData({ posts: data.posts.concat(res.data) });
            res.data.length === 0 && setHasMore(false)
            console.log(res.data);
        });
        setIndex(newIndex);
    };

    const str = categoria;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <React.Fragment>
            <Container>
                <h1>Listando categoria {str2}</h1>
                <Grid container spacing={1} style={{ width: '100%' }}>
                    <Grid item xs={8}>
                        <InfiniteScroll
                            dataLength={data.posts.length}
                            next={FetchMoreData}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            style={{overflow: 'visible',}}
                        >
                            {data.posts.map(item => <CustomCard item={item} />)}
                        </InfiniteScroll>
                    </Grid>
                    <Grid item xs={4}>
                        <Side />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};


const CustomCard = ({ item }) => {
    const classes = useStyles();
    return (
        <Link href={'http://localhost:3000/post/' + item.slug} color='textPrimary' underline='none'>
            <Card className={classes.customCard}>
                <CardActionArea style={{ display: 'flex', overflow: 'visible' }}>
                    <Categories list={item.category_name} />
                    <Grid container style={{ overflow: 'visible', height: '27vh', width: '100%' }} >
                        <Grid item xs={5} style={{ width: '100%', overflow: 'visible' }} >
                            <CardMedia
                                className={classes.cardImage}
                                component="img"
                                image={'http://127.0.0.1:8000' + item.image}
                            />
                        </Grid>
                        <Grid item xs={7} style={{ width: '100%', height: '100%', overflow: 'visible', }} >
                            <Box className={classes.textBox}>
                                <Typography variant='h5' >{item.title}</Typography>
                                <Typography variant='body2' className={classes.truncate} >{parseHtmlContent(item.content)}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Link>
    );
};


export default ListCategories;