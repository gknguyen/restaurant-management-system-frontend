import { Box, LinearProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import BottomBar from './components/bottomBar';
import TopBar from './components/topBar';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 40,
    },
  },
}));

interface Props {
  route: any;
}

const Auth: React.FC<Props> = (props) => {
  const { route } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <TopBar />
      <Box className={classes.content}>
        <Suspense fallback={<LinearProgress />}>{renderRoutes(route.routes)}</Suspense>
      </Box>
      <BottomBar />
    </Fragment>
  );
};

export default Auth;
