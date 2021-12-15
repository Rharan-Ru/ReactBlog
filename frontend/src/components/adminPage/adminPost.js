import React from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	Content: {
		'& *': {
			margin: '0px',
		},
		'& p img': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			maxHeight: '600px',
			objectFit: 'contain',
		},
	},
}));


const AdminSingle = () => {
	const classes = useStyles();

	const [data, setData] = React.useState({ posts: [] });
	const { slug } = useParams();
	console.log(slug)
	React.useEffect(() => {
		axiosInstance.get('admin-details/' + slug).then((res) => {
			setData({ posts: res.data });
			console.log(res.data);
		});
	}, [setData, slug]);

	return (
		<Container component="main">
			<Grid container>
				<Grid item xs={9}>
					<Typography
						component="h3"
						variant="h2"
						color="textPrimary"
						gutterBottom
					>
						{data.posts.title}
					</Typography>
					<div style={{ whiteSpace: 'pre-wrap' }} className={classes.Content}>
						{parse(String(data.posts.content))}
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default AdminSingle;
