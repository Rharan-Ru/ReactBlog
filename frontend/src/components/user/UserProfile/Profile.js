import React from 'react';
import axiosInstance from '../../../axios';
import { useParams } from 'react-router-dom';

// Custom Components
import CustomCardPerfil from '../../adminPage/components/CustomCardPerfil';
import CustomPostCard from '../../adminPage/components/CustomCardPost';

// Material Ui Components
import { Box, Tab, Grid } from "@material-ui/core/";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { makeStyles } from '@material-ui/core';

// Library Components
import Media from 'react-media';



const useStyles = makeStyles((theme) => ({
    imageBackground: {
        background: "url('https://carbonmade-media.accelerator.net/30443284;640x266.jpeg') rgba(0, 0, 0, 0.8)",
        backgroundSize: 'contains',
        backgroundBlendMode: 'multiply',
        height: '25vh',
        padding: '0px',
        margin: '0px',
        width: '100%',
    },
}));


const UserPerfil = ({ list }) => {
    const classes = useStyles();
    const [data, setData] = React.useState({ perfil: [], posts: []});
    const { slug } = useParams();

    React.useEffect(() => {
        axiosInstance.get('users/profile/' + slug).then((res) => {
            setData({ perfil: res.data.data, posts: res.data.articles });
            console.log(res.data);
        });
    }, [setData, slug]);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <div className={classes.imageBackground}>
            </div>
            <Box style={{ padding: '0 20px', minHeight: '100vh' }}>
                <Media queries={{
                    small: "(max-width: 599px)",
                    medium: "(min-width: 600px) and (max-width: 899px)",
                    large: "(min-width: 900px)"
                }}>
                    {matches => (
                        <React.Fragment>
                            {matches.small && <CustomCardPerfil name={data.perfil.username} admin={false} image={data.perfil.image} wid={'100%'} />}
                            {matches.medium && <CustomCardPerfil name={data.perfil.username} admin={false} image={data.perfil.image} wid={'100%'} />}
                            {matches.large && <CustomCardPerfil name={data.perfil.username} admin={false} image={data.perfil.image} wid={'30%'} />}
                        </React.Fragment>
                    )}
                </Media>
                <Media queries={{
                    small: "(max-width: 599px)",
                    medium: "(min-width: 600px) and (max-width: 899px)",
                    large: "(min-width: 900px)"
                }}>
                    {matches => (
                        <React.Fragment>
                            {matches.small && <div style={{ float: 'left', width: '100%' }}>
                                <UserData data={data} value={value} handleChange={handleChange} list={data.posts} />
                            </div>}
                            {matches.medium && <div style={{ float: 'left', width: '100%' }}>
                                <UserData data={data} value={value} handleChange={handleChange} list={data.posts} />
                            </div>}
                            {matches.large && <div style={{ float: 'left', width: '70%' }}>
                                <UserData data={data} value={value} handleChange={handleChange} list={data.posts} />
                            </div>}
                        </React.Fragment>
                    )}
                </Media>
            </Box>
        </React.Fragment>
    );
};


const UserData = ({ data, value, handleChange, list }) => {
    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Perfil" value="1" />
                    <Tab label="Posts" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1" style={{ width: '100%', padding: '0 10px 0 0' }}>
                <Grid container>
                    <Grid item xs={3} style={{ height: '5vh', display: 'flex', alignItems: 'center', margin: '5px 0', backgroundColor: 'gray', padding: '5px' }}>
                        Nickname
                    </Grid>
                    <Grid item xs={9} style={{ height: '5vh', display: 'flex', alignItems: 'center', margin: '5px 0', backgroundColor: 'gray', padding: '5px' }}>
                        {data.perfil.username}
                    </Grid>

                    <Grid item xs={3} style={{ margin: '5px 0', padding: '5px' }}>
                        About Me
                    </Grid>
                    <Grid item xs={9} style={{ margin: '5px 0', padding: '5px' }}>
                        {data.perfil.about}
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value="2">
                {data.posts.length > 0 && list.map(item => <CustomPostCard item={item} key={item.id} isAdmin={false} />)}
            </TabPanel>
        </TabContext>
    );
}

export default UserPerfil;