import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Menu, Modal, Box, Typography } from "@material-ui/core";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import axiosInstance from "../../../axios";


const useStyles = makeStyles((theme) => ({
    linkButton: {
        display: 'flex',
        color: 'white',
        height: '30px',
        padding: '5px',
        margin: '5px',
        position: 'absolute',
        zIndex: '1',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black',
        },
    },
    customModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        backgroundColor: 'blue',
        color: 'white',
        border: '2px solid #000',
        padding: '10px',
    }
}));


const BasicMenu = ({ slug, isAdmin, isPub }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {isPub === 'published' ?
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={classes.linkButton}
                    style={{backgroundColor: 'blue',}}
                >
                    <AutoAwesomeIcon />
                </Button> :
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={classes.linkButton}
                    style={{backgroundColor: 'red',}}
                >
                    <AutoAwesomeIcon />
                </Button>
            }
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={classes.linkButton}
            >
                <AutoAwesomeIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {isAdmin ? <Button style={{ width: '100%' }} href={'http://localhost:3000/admin/update/' + slug}>Edit</Button> : <Button style={{ width: '100%' }} href={'http://localhost:3000/update/' + slug}>Edit</Button>}
                <CustomModal slug={slug} type={'delete'} />
                {isPub === 'draft' &&
                    <CustomModal slug={slug} type={'publish'} />
                }
            </Menu>
        </React.Fragment>
    );
};


const CustomModal = ({ type, slug }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitPublish = (e) => {
        e.preventDefault();
        axiosInstance.post(`admin/published/` + slug);

        window.location.reload();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post(`admin/delete/` + slug);

        window.location.reload();
    };

    return (
        <React.Fragment>
            {
                type === 'publish' ?
                    <Button onClick={handleOpen} style={{ width: '100%' }}>Publish</Button> :
                    <Button onClick={handleOpen} style={{ width: '100%' }}>Delete</Button>
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.customModal}>
                    {type === 'publish' &&
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm Publish Post
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Este post será publicado, deseja confirmar a publicação?
                            </Typography>
                            <form style={{ width: '100%' }} >
                                <Button style={{ width: '100%' }} type='submit' onClick={handleSubmitPublish}>Publish</Button>
                            </form>
                        </>
                    }
                    {type === 'delete' &&
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm Delete Post
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Este post será deletado, deseja confirmar a exclusão?
                            </Typography>
                            <form style={{ width: '100%' }} >
                                <Button style={{ width: '100%' }} type='submit' onClick={handleSubmit}>Delete</Button>
                            </form>
                        </>
                    }
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default BasicMenu;
