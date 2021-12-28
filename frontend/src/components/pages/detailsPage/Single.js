import React from 'react';

// Custom axios and librarys
import axiosInstance from '../../../axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

// My components
import Side from '../../globals/Side';

//MaterialUI
import { makeStyles } from '@material-ui/core';
import { Card, CardMedia, Grid, Typography, Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	Content: {
		'& img': {
			width: '100%',
			objectFit: 'contain',
			maxHeight: '70vh',
		},
		'& p': {
			margin: '0px',
		},
	},
}));


const Single = () => {
	const classes = useStyles();

	const [data, setData] = React.useState({ post: [] });
	const { slug } = useParams();

	React.useEffect(() => {
		axiosInstance.get('details/' + slug).then((res) => {
			setData({ post: res.data });
		});
	}, [setData, slug]);

	return (
		<Container style={{ marginTop: '24px', }}>
			<Grid container spacing={2}>
				<Grid item md={8} style={{ width: '100%',}}>
					<Typography
						component="h4"
						variant="h3"
						color="textPrimary"
					>
						{data.post.title}
						<Card style={{ backgroundColor: "none", boxShadow: 'none' }}>
							<CardMedia
								component="img"
								image={'http://127.0.0.1:8000' + data.post.image}
								style={{ maxHeight: '60vh', objectFit: 'contain' }}
							/>
						</Card>
					</Typography>
					<div className={classes.Content} style={{ whiteSpace: 'pre-wrap' }}>
						{parse(String(data.post.content))}
					</div>
				</Grid>
				<Grid item md={4} style={{ width: '100%' }}>
					<Side />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Single;
