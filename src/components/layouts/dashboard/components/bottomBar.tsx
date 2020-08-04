import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
  }),
);

const BottomBar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className="d-flex justify-content-center">
        <Typography variant="h5">Copyright</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default BottomBar;
