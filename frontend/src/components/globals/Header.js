import React from "react";
import { HeaderCategories } from "../utils/Categories";

import {
    Divider, Drawer, Button, MenuItem, Menu,
    Tooltip, Link, CssBaseline, Typography, AppBar
} from "@material-ui/core";

// import SearchBar from "material-ui-search-bar";
// import ToolBar from '@material-ui/core/Toolbar';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';

import chapeu from '../../chapeu.png';

import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `2px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#2d1238',
        height: '60px',
    },

    site_name: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    link: {
        padding: theme.spacing(1),
        color: 'white',
        transition: '500ms',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        padding: '0px',
        '&:hover': {
            backgroundColor: "#e10735",
            transition: '500ms',
            '& svg': {
                color: '#55D0E0',
                transition: '500ms',
            },
        },
    },
    link2: {
        padding: theme.spacing(2),
        color: 'white',
        transition: '500ms',
        height: '7vh',
        alignItems: 'center',
        display: 'flex',
        minWidth: '55vh',
        '&:hover': {
            backgroundColor: "#e10735",
            transition: '500ms',
            '& svg': {
                color: '#55D0E0',
                transition: '500ms',
            },
        },
    },
    right: {
        marginLeft: 'auto',
        marginRight: '0px',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        color: 'white',
    },
    drawer: {
        backgroundColor: '#3f51b5',
        background: "url('https://i0.wp.com/www.toppapeldeparede.com.br/wp-content/uploads/2021/02/anime-4k.png?resize=576%2C1024&ssl=1'), linear-gradient(#000000, #f88296)",
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
    },
}));



const Header = () => {
    const [anchor, setAnchor] = React.useState(null);

    const handleClose = () => {
        setAnchor(null);
    };

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    const classes = useStyles();
    // const navigate = useNavigate();

    // const [data, setData] = React.useState({ search: '' });
    // const goSearch = (e) => {
    //     navigate({
    //         pathname: '/search/',
    //         search: '?search=' + data.search,
    //     });
    //     window.location.reload();
    // };

    const [logged, setLogged] = React.useState({ log: null });
    const access_token = localStorage.getItem('access_token');
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (access_token) {
            const token = JSON.parse(atob(access_token.split('.')[1]));
            const now = Math.ceil(Date.now() / 1000);
            token.exp > now ? setLogged({ log: true }) : setLogged({ log: false });
            setName(token.name);
        }
        else {
            setLogged({ log: false });
        };
    }, [access_token]);

    const categories = ['Anime', 'Manga', 'Listas', 'Shounen', 'Geral']
    const uses = ['Privacy', 'Terms-of-Use', 'About', 'Contact']

    // For Drawer
    const [state, setState] = React.useState({ left: false, });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    return (
        <React.Fragment>
            <AppBar position='static' color='default' elevation={0} className={classes.appBar}>
                <CssBaseline />
                <div style={{ borderRight: '1px solid white' }}>
                    <Button onClick={toggleDrawer('left', true)}><MenuIcon style={{ color: 'white' }} /></Button>
                    <Drawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        style={{ width: '100%' }}
                        classes={{ paper: classes.drawer }}
                    >
                        <Button onClick={toggleDrawer('left', false)} style={{ color: 'white', width: '10px', margin: '10px', backgroundColor: '#e10735' }}><CloseIcon style={{ fontSize: '20px' }} /></Button>
                        <Button href='#' className={classes.link2} style={{borderRadius: '0px'}} variant='outlined' component={NavLink} to='/create'>
                            <CreateIcon /> Create Post <CreateIcon />
                        </Button>
                        <Divider style={{ backgroundColor: 'white', margin: '10px' }} />
                        <HeaderCategories list={categories} classes={classes.link2} />
                        <Divider style={{ backgroundColor: 'white', margin: '10px' }} />
                        <HeaderCategories list={uses} classes={classes.link2} />
                    </Drawer>
                </div>
                <Typography variant='h6' noWrap>
                    <Link className={classes.site_name} component={NavLink} to='/' underline='none' style={{ color: 'white' }}>
                        <img src={chapeu} alt="Logo" width={60} />Mangá Brasil
                    </Link>
                </Typography>

                <div className={classes.right}>

                    <Tooltip onClick={handleOpenMenu} style={{ cursor: 'pointer' }} title="Open settings">
                        <AccountCircleIcon style={{ fontSize: "30px", cursor: 'pointer' }} />
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        style={{ marginTop: '40px' }}
                        anchorEl={anchor}
                        keepMounted
                        open={Boolean(anchor)}
                        onClose={handleClose}
                    >
                        {logged.log ?
                            <div>
                                <Link style={{ color: 'black' }} underline='none' component={NavLink} to={'perfils/' + name} >
                                    <MenuItem key={'perfil'} onClick={handleClose}>Perfil</MenuItem>
                                </Link>
                                <Link style={{ color: 'black' }} underline='none' component={NavLink} to='logout/' >
                                    <MenuItem key={'logout'} onClick={handleClose}>Logout</MenuItem>
                                </Link>

                            </div>
                            :
                            <div>
                                <Link style={{ color: 'black' }} underline='none' component={NavLink} to='login/' >
                                    <MenuItem key={'login'} onClick={handleClose}>Login</MenuItem>
                                </Link>
                                <Link style={{ color: 'black' }} underline='none' component={NavLink} to='register/' >
                                    <MenuItem key={'register'} onClick={handleClose}>Register</MenuItem>
                                </Link>
                            </div>
                        }
                    </Menu>
                </div>

                {/* <List className={classes.right}>
                    <SearchBar
                        value={data.search}
                        onChange={(newValue) => setData({ search: newValue })}
                        onRequestSearch={() => goSearch(data.search)}
                    />
                    <ListItem onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem sx={{ pl: 4 }}>
                                <Link href='#' color='primary' underline='none' className={classes.link} component={NavLink} to='/login'>Login</Link>
                                <Link href='#' color='primary' underline='none' className={classes.link} component={NavLink} to='/logout'>Logout</Link>
                            </ListItem>
                        </List>
                    </Collapse>
                </List> */}
            </AppBar>
        </React.Fragment>
    );
};

export default Header;
