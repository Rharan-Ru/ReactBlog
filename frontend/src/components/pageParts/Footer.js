import React from "react";

import Container  from "@material-ui/core/Container";
import Grid  from "@material-ui/core/Grid";
import Link  from "@material-ui/core/Link";
import Box  from "@material-ui/core/Box";
import Typography  from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));


const Copyright = () => {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright ©'}
            <Link color='textPrimary' href='https://mangabrasil.site' target='_blank'>
                Manga Brasil
            </Link>
            {' • '}{new Date().getFullYear()}{' • '}
        </Typography>
    )
}


const footers = [
    {
        title: 'Company',
        description: [
            'Cool Stuffs',
            'Django Blog',
            'Contact',
            'Privacy',
            'Politics',
            'Term of use'
        ]
    },
    {
        title: 'Blog',
        description: [
            'Cool Stuffs',
            'Django Blog',
            'Contact',
            'Privacy',
            'Politics',
            'Term of use'
        ]
    },
]


const Footer = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container maxWidth='md' component='footer' className={classes.footer}>
                <Grid container spacing={4} justifyContent='space-evenly'>
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant='h6' color='textPrimary'>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((desc) => (
                                    <li key={desc}>
                                        <Link href='#' variant='subtitle1' color='textSecondary'>{desc}</Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>

    )
};

export default Footer;