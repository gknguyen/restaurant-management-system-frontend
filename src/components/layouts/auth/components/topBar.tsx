import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
    },
    appBar: {
      background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    },
    toolBar: {
      minHeight: 40,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
);

const TopBar: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap={true}>
            GK's bar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
