import React, { useState } from 'react';
import Side from '../globals/Side';

import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Card, CardMedia } from '@material-ui/core';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const names = [
    'Geral',
    'Anime',
    'Manga',
    'Shounen',
    'Listas',
];


const Update = () => {
    const classes = useStyles();
    const history = useNavigate();
    const { slug } = useParams();

    const initialFormData = Object.freeze({
        title: '',
    });

    const initialFormDataContent = Object.freeze({
        content: '',
    });
    const [previewData, setPreview] = useState(null);

    const [postData, updateFormData] = useState(initialFormData);
    const [postDataContent, updateDataContent] = useState(initialFormDataContent);
    const [postimage, setPostImage] = useState(null);
    const [personName, setPersonName] = React.useState([]);

    const [data, setData] = React.useState({ post: [], loading: true });

    React.useEffect(() => {
        axiosInstance.get('details/update/' + slug)
            .then((res) => {
                setData({ post: res.data, loading: false });
                console.log(res.data);
                updateFormData({ title: res.data.title });
                updateDataContent({ content: res.data.content });
                setPostImage(res.data.image);
                setPreview('http://127.0.0.1:8000' + res.data.image);
                setPersonName(res.data.category_name)
            })
            .catch(function (error) {
                console.log(error.response.status);
                error.response.status === 404 && history('/not-found');
            });
    }, [setData, slug]);

    const handleChange = (e) => {
        if ([e.target.name] == 'image') {
            setPostImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
            console.log(e.target.files);
        }
        else {
            updateFormData({
                ...postData,
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const handleChangeCategories = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postDataContent.content);
        formData.append('categories', personName);
        formData.append('image', postimage);
        console.log(postDataContent);
        axiosInstance.post(`update/` + slug, formData);
        // history({
        // 	pathname: '/',
        // });
        window.location.reload();
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['clean']
        ],
    };

    return (
        data.loading ?
            <div>Loading data</div> :
            <React.Fragment>
                <Container component="main">
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="title"
                                        label=''
                                        name="title"
                                        autoComplete="title"
                                        value={postData.title}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ height: '560px' }}>
                                    <ReactQuill
                                        theme='snow'
                                        value={postDataContent.content}
                                        onChange={(value) => updateDataContent({ content: value })}
                                        modules={modules}
                                        // formats={formats}
                                        style={{ height: '460px' }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="categories"
                                        multiple
                                        value={personName}
                                        onChange={handleChangeCategories}
                                        input={<OutlinedInput label="Tag" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        style={{ width: '100%' }}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={6} >
                                    <Grid item xs={12} style={{ width: '100%', overflow: 'visible' }}>
                                        <CardMedia
                                            component="img"
                                            image={previewData}
                                            style={{ width: '100%', height: '40vh', objectFit: 'contain' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ width: '100%', height: '100%', overflow: 'visible' }} >
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="post-image"
                                            onChange={handleChange}
                                            multiple
                                            name="image"
                                            type="file"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        href={'http://localhost:3000/admin/'}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={handleSubmit}
                                    >
                                        Update Post
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </React.Fragment>
    );
};


const PostUpdate = () => {
    return (
        <Container >
            <Typography component="h1" variant="h5" style={{ padding: '24px', height: '10vh' }}>
                Edit Post
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={8} style={{ width: '100%' }}>
                    <Update />
                </Grid>
                <Grid item xs={4} style={{ width: '100%' }}>
                    <Side />
                </Grid>
            </Grid>
        </Container>
    );
};


export default PostUpdate;