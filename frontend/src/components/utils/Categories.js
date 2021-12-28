import React from 'react';

import Link from "@material-ui/core/Link";
import { Box, Typography } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

import HealingIcon from '@mui/icons-material/Healing';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CookieIcon from '@mui/icons-material/Cookie';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const useStyles = makeStyles((theme) => ({
    linkCustom: {
        padding: '5px',
        color: 'purple',
        margin: '5px',
        transition: '500ms',
        borderRadius: '50%',
        backgroundColor: "black",
        '&:hover': {
            transition: '500ms',
            color: '#55D0E0',
        },
    },
}));


const Categories = ({ list }) => {
    return (
        <React.Fragment>
            <Box style={{ display: 'flex', position: 'absolute', top: '-15px', left: '0', width: '100%', }}>
                {list.map(item =>
                    <Link key={item} title={item} href={'http://localhost:3000/categoria/' + item.toLowerCase()}>
                        <Icons category={item} sizeIcon={'40px'} />
                    </Link>
                )}
            </Box>
        </React.Fragment>
    );
};


const HeaderCategories = ({ list, classes }) => {
    return (
        <React.Fragment>
            {list.map(item =>
                <Link key={item} title={item} href={'http://localhost:3000/categoria/' + item.toLowerCase()} className={classes} underline='none'>
                    <Icons category={item} sizeIcon={'30px'} />
                    <Typography variant='body2' style={{ padding: '5px' }}>{item}</Typography>
                </Link>
            )}
        </React.Fragment>
    );
};


const Icons = ({ category, sizeIcon }) => {
    const classes = useStyles();
    switch (category) {
        case 'Manga':
            return (
                <HealingIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></HealingIcon>
            );
        case 'Anime':
            return (
                <AutoAwesomeIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></AutoAwesomeIcon>
            );
        case 'Geral':
            return (
                <LibraryBooksIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></LibraryBooksIcon>
            );
        case 'Listas':
            return (
                <AcUnitIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></AcUnitIcon>
            );
        case 'Shounen':
            return (
                <CookieIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></CookieIcon>
            );
        case 'Privacy':
            return (
                <PolicyIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></PolicyIcon>
            );
        case 'Terms-of-Use':
            return (
                <GavelIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></GavelIcon>
            );
        case 'About':
            return (
                <InfoIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></InfoIcon>
            );
        case 'Contact':
            return (
                <ContactPageIcon className={classes.linkCustom} style={{ fontSize: sizeIcon }}></ContactPageIcon>
            );
        default:
            throw new Error();
    };
};


export { Categories };
export { HeaderCategories };

