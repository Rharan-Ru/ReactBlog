import React from 'react';

import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";

import HealingIcon from '@mui/icons-material/Healing';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const useStyles = makeStyles((theme) => ({
    link: {
        padding: '5px',
        margin: '0px 0px 0px 10px',
        color: 'purple',
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
        <div style={{ display: 'flex', position: 'absolute', top: '-7px', left: '0', width: '100%', }}>
            {list.map(item => <Icons key={item} category={item} />)}
        </div>
    );
};

const Icons = ({ category }) => {
    const classes = useStyles();
    const sizeIcon = '40px';
    switch (category) {
        case 'Manga':
            return (
                <Link title={category} href={category}>
                    <HealingIcon className={classes.link} style={{ fontSize: sizeIcon }} href={category}></HealingIcon>
                </Link>
            );
        case 'Anime':
            return (
                <Link title={category} href={category}>
                    <AutoAwesomeIcon className={classes.link} style={{ fontSize: sizeIcon }}></AutoAwesomeIcon>
                </Link>
            );
        case 'General':
            return (
                <Link title={category}>
                    <LibraryBooksIcon className={classes.link} style={{ fontSize: sizeIcon }} href={category}></LibraryBooksIcon>
                </Link>
            );
        case 'Listas':
            return (
                <Link title={category} href={category}>
                    <LibraryBooksIcon className={classes.link} style={{ fontSize: sizeIcon }}></LibraryBooksIcon>
                </Link>
            );
        case 'Shounen':
            return (
                <Link title={category} href={category}>
                    <LibraryBooksIcon className={classes.link} style={{ fontSize: sizeIcon }}></LibraryBooksIcon>
                </Link>
            );
        default:
            throw new Error();
    };
};

export default Categories;