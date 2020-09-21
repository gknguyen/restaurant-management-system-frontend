import { Box, LinearProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import BottomBar from './components/bottomBar';
import TopBar from './components/topBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  content: {
    // height: '100%',
    // justifyContent: 'center',
    // paddingTop: 56,
    // [theme.breakpoints.up('sm')]: {
    //   paddingTop: 40,
    // },
  },
}));

interface Props {
  route?: any;
}

const Auth: React.FC<Props> = (props) => {
  const { route } = props;

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Fragment>
        <TopBar />
        <Box component="main" className={classes.content}>
          <Suspense fallback={<LinearProgress />}>{renderRoutes(route.routes)}</Suspense>
        </Box>
        <BottomBar />
      </Fragment>
    </Box>
  );
};

export default Auth;
