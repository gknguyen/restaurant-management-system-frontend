import { LinearProgress, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Fragment, Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import NavBar from './components/navBar';
import BottomBar from './components/bottomBar';
import TopBar from './components/topBar';
import { connect } from 'react-redux';
import * as commonActions from '../../../redux/commonReducers/actions';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  topBar: {
    zIndex: 2,
    position: 'relative',
  },
  navBar: {
    zIndex: 3,
    width: '100%',
    maxWidth: 250,
    // minWidth: 200,
    flex: '0 0 auto',
  },
  navBarSmall: {
    zIndex: 3,
    width: '100%',
    maxWidth: 80,
    // minWidth: 50,
    flex: '0 0 auto',
  },
  content: {
    height: '100vh',
    overflowY: 'auto',
    flex: '1 1 auto',
  },
}));

interface Props {
  /** params */
  route: any;
  /** redux params */
  navBarOpenFlag: boolean;
  /** redux functions */
  sendNavBarOpenFlag: Function;
}

const Dashboard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [openNavBarMobile, setOpenNavBarMobile] = useState(true);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <Box className={classes.root}>
      <Fragment>
        <TopBar />
        <Box className={classes.container}>
          <NavBar
            // className={props.navBarOpenFlag ? classes.navBar : classes.navBarSmall}
            className={classes.navBar}
            // onMobileClose={handleNavBarMobileClose}
            // openMobile={openNavBarMobile}
            openMobile={props.navBarOpenFlag}
          />
          <main className={classes.content}>
            <Suspense fallback={<LinearProgress />}>{renderRoutes(props.route.routes)}</Suspense>
          </main>
        </Box>
      </Fragment>
    </Box>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    navBarOpenFlag: state.commonReducer.navBarOpenFlag,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendNavBarOpenFlag: (navBarOpenFlag: boolean) => {
      dispatch(commonActions.actionReceiveNavBarOpenFlag(navBarOpenFlag));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
