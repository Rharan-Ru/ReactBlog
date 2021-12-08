import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

// import SearchBar from "material-ui-search-bar";
// import ToolBar from '@material-ui/core/Toolbar';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ViewListIcon from '@mui/icons-material/ViewList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        backgroundColor: '#312e2e',
        height: '60px',
    },

    site_name: {
        padding: theme.spacing(3),
    },

    link: {
        padding: theme.spacing(1),
        color: 'white',
        transition: '500ms',
        height: '60px',
        alignItems: 'center',
        display: 'flex',
        '&:hover': {
            backgroundColor: "#e10735",
            transition: '500ms',
            '& $icons': {
                color: '#55D0E0',
                transition: '500ms',
            },
        },
    },

    icons: {
        transition: '500ms',
        color: 'purple',
    },

    right: {
        marginLeft: 'auto',
        marginRight: '0px',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        color: 'white',
    }
}));



const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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

    const [logged, setLogged] = React.useState({ log: false });
    const local_access_token = localStorage.getItem('access_token')
    React.useEffect(() => {
        if (local_access_token) {
            const token = JSON.parse(atob(local_access_token.split('.')[1]));
            setLogged({ log: true });
        }
        else {
            setLogged({ log: false })
        };
    }, [local_access_token]);
    const categories = ['Animes', 'Mangas', 'Listas']
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position='static' color='default' elevation={0} className={classes.appBar}>
                <Typography variant='h6' noWrap>
                    <Link className={classes.site_name} component={NavLink} to='/' underline='none' style={{ color: 'white' }}>
                        Mangá Brasil
                    </Link>
                </Typography>
                <Media query="(min-width: 599px)" render={() =>
                (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        {categories.map((category) => (
                            <Link className={classes.link} key={category} underline='none' component={NavLink} to='animes/'>
                                < AutoAwesomeIcon className={classes.icons} fontSize="small" /> {category}
                            </Link>
                        ))}
                    </div>
                )}
                />
                {/* <Media query="(min-width: 599px)">
                    {matches => (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            {categories.map((category) => (
                                <Link className={classes.link} underline='none' component={NavLink} to='animes/'>
                                    < AutoAwesomeIcon className={classes.icons} fontSize="small" /> {category}
                                </Link>
                            ))}
                        </div>
                    )}
                </Media> */}

                <div className={classes.right}>
                    <Button href='#' color='primary' style={{height: '100%', marginRight: '10px', color:'white', padding:'10px'}} variant='outlined' component={NavLink} to='/create'>Create Post</Button>
                    <Tooltip onClick={handleOpenUserMenu} style={{ cursor: 'pointer' }} title="Open settings">
                        <AccountCircleIcon style={{ fontSize: "30px", cursor: 'pointer' }} />
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        style={{ marginTop: '40px' }}
                        anchorEl={anchorElUser}
                        keepMounted
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {logged.log ?
                            <Link style={{ color: 'black' }} underline='none' component={NavLink} to='logout/' >
                                <MenuItem key={'logout'} onClick={handleCloseNavMenu}>Logout</MenuItem>
                            </Link>
                            :
                            <div>
                                <Link style={{ color: 'black' }} underline='none' component={NavLink} to='login/' >
                                    <MenuItem key={'login'} onClick={handleCloseNavMenu}>Login</MenuItem>
                                </Link>
                                <Link style={{ color: 'black' }} underline='none' component={NavLink} to='register/' >
                                    <MenuItem key={'register'} onClick={handleCloseNavMenu}>Register</MenuItem>
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
