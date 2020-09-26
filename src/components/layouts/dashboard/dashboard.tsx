import { Box, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, Suspense } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import * as commonActions from '../../../redux/commonReducers/actions';
import NavBar from './components/navBar';
import TopBar from './components/topBar';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
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
    height: '100%',
    overflowY: 'auto',
    flex: '1 1 auto',
  },
}));

interface Props {
  /** params */
  route?: any;
  /** redux params */
  navBarOpenFlag: boolean;
  /** redux functions */
  sendNavBarOpenFlag: Function;
}

const Dashboard: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Fragment>
        <TopBar />
        <Box className={classes.container}>
          <NavBar className={classes.navBar} openMobile={props.navBarOpenFlag} />
          <Box component="main" className={classes.content}>
            <Suspense fallback={<LinearProgress />}>{renderRoutes(props.route.routes)}</Suspense>
          </Box>
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
