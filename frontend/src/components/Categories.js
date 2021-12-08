import React from 'react';

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
                <a title={category} href={category}>
                    <HealingIcon className={classes.link} style={{ fontSize: sizeIcon }} alt></HealingIcon>
                </a>
            );
        case 'Anime':
            return (
                <a title={category} href={category}>
                    <AutoAwesomeIcon className={classes.link} style={{ fontSize: sizeIcon }} alt></AutoAwesomeIcon>
                </a>
            );
        case 'General':
            return (
                <a title={category} href={category}>
                    <LibraryBooksIcon className={classes.link} style={{ fontSize: sizeIcon }} alt></LibraryBooksIcon>
                </a>
            );
        case 'Listas':
            return (
                <a title={category} href={category}>
                    <LibraryBooksIcon className={classes.link} style={{ fontSize: sizeIcon }} alt></LibraryBooksIcon>
                </a>
            );
        default:
            throw new Error();
    };
};

export default Categories;