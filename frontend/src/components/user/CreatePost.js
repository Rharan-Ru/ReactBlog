import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import Side from '../globals/Side';

//MaterialUI
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
import CardMedia from '@material-ui/core/CardMedia';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import ImageCompress from 'quill-image-compress';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageCompress', ImageCompress);


const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 'rgb(0 0 0 / 5%)',
        borderRadius: '10px',
		padding: '10px',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	titleHeader: {
        height: '10vh',
        padding: '4px',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
    },
}));

const names = [
	'Geral',
	'Anime',
	'Manga',
	'Shounen',
	'Listas',
];


const CreatePost = () => {
	const classes = useStyles();

	const history = useNavigate();

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

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
		else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('content', postDataContent);
		formData.append('image', postimage.image[0]);
		formData.append('categories', personName);
		console.log(postDataContent);
		axiosInstance.post(`create/`, formData);
		// history({
		// 	pathname: '/',
		// });
		// window.location.reload();
	};

	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, 5, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
			['clean']
		],
		imageResize: {
			parchment: Quill.import('parchment'),
			handleStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
            },
        },
		imageCompress: {
			quality: 0.7, // default
			maxWidth: 800, // default
			maxHeight: 600, // default
		},
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

	return (
		<div className={classes.paper}>
			<Typography className={classes.titleHeader} align='center' gutterBottom variant="h5" component="div">
                Crie algo novo!
            </Typography>
			<form className={classes.form} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="title"
							label="Post Title"
							name="title"
							autoComplete="title"
							onChange={handleChange}
							style={{ color: 'white'}}
						/>
					</Grid>
					<Grid item xs={12} style={{ height: '100%' }}>
						<ReactQuill
							theme='snow'
							value={postDataContent}
							onChange={(value) => updateDataContent(value)}
							modules={modules}
							// formats={formats}
							style={{ height: '100%', border: '1px solid black', }}
							height={400}
							required
						/>
					</Grid>
					<Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
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
					<Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
						<Grid item xs={12} style={{ width: '100%', overflow: 'visible' }}>
							<CardMedia
								component="img"
								image={previewData}
								style={{ width: '100%', height: '40vh', objectFit: 'contain' }}
							/>
						</Grid>
						<Grid item xs={12} style={{ width: '100%', height: '100%' }} >
							<input
								accept="image/*"
								className={classes.input}
								id="post-image"
								onChange={handleChange}
								multiple
								name="image"
								type="file"
								style={{ width: '100%' }}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={handleSubmit}
				>
					Create Post
				</Button>
			</form>
		</div>
	);
}

const Create = () => {
	return (
		<React.Fragment>
			<Container style={{ marginTop: '24px' }}>
				<Grid container spacing={2}>
					<Grid item lg={8} md={8} sm={12} style={{width: '100%'}}>
						<CreatePost />
					</Grid>
					<Grid item lg={4} md={4} sm={12} style={{width: '100%'}}>
						<Side />
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Create;