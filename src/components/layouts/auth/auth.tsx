import { LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Fragment, Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
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

const Auth: React.FC = (props: any) => {
  const { route } = props;

  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <Fragment>
      <TopBar />
      <div className={classes.content}>
        <Suspense fallback={<LinearProgress />}>{renderRoutes(route.routes)}</Suspense>
      </div>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object,
};

export default Auth;
