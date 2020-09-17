import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    },
    toolBar: {
      minHeight: 40,
      justifyContent: 'center',
    },
  }),
);

const BottomBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Typography>
          Powered by{' '}
          <Link href="https://material-ui.com" target="_blank" color="inherit">
            @Material-UI
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default BottomBar;
