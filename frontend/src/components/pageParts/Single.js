import React from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(2),
// 		display: 'flex',
// 		flexDirection: 'column',
// 	},
// }));


const Single = () => {
	const [data, setData] = React.useState({ posts: [] });
	const { slug } = useParams();
	console.log(slug)
	React.useEffect(() => {
		axiosInstance.get('details/' + slug).then((res) => {
			setData({ posts: res.data });
			console.log(res.data);
		});
	}, [setData, slug]);

	return (
		<Container component="main">
			<CssBaseline />
			<Container >
				<Typography
					component="h3"
					variant="h2"
					color="textPrimary"
					gutterBottom
				>
					{data.posts.title}
				</Typography>
				<Typography
					variant="body1"
					color="textSecondary"
					paragraph
					style={{ whiteSpace: 'pre-wrap' }}
				>
					{parse(String(data.posts.content))}
				</Typography>
			</Container>
		</Container>
	);
};

export default Single;
