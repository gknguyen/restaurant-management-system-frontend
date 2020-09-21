import { Avatar, Box, Divider, Drawer, Hidden, Paper, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import navigationRoutes from '../../../../commons/navigation/components/navigationRoutes';
import Navigation from '../../../../commons/navigation/navigation';
import { AWS_S3_BUCKET_URL } from '../../../../configs/constants';
import { getdUserInfo } from '../../../../configs/localStore';
import useRouter from '../../../../configs/userRouter';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '93vh',
    overflowY: 'auto',
  },
  content: {
    padding: theme.spacing(2),
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  navigation: {
    // marginTop: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    top: '65px',
    // height: '90%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    top: '65px',
    // height: '90%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

interface Props {
  className: string;
  openMobile: boolean;
  children?: React.ReactNode;
}

const NavBar: React.FC<Props> = (props) => {
  const { openMobile, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  // const userInfo = getdUserInfo();

  // const userImageUrl = `${AWS_S3_BUCKET_URL}/users/${userInfo.avatar}`;

  React.useEffect(() => {}, [router.location.pathname]);

  const navbarContent = (
    <Box className={classes.content}>
      {/* {openMobile && (
        <Box>
          <Box className={classes.profile}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              component={RouterLink}
              src={userImageUrl}
              to="/profile/1/timeline"
            />
            <Typography className={classes.name} variant="h6">
              {userInfo.fullName}
            </Typography>
          </Box>

          <Divider className={classes.divider} />
        </Box>
      )} */}

      <nav className={classes.navigation}>
        {navigationRoutes.map((list) => (
          <Navigation component="div" key={list.title} pages={list.pages} title={list.title} />
        ))}
      </nav>
    </Box>
  );

  return (
    <Fragment>
      <Drawer
        anchor="left"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openMobile,
          [classes.drawerClose]: !openMobile,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openMobile,
            [classes.drawerClose]: !openMobile,
          }),
        }}
      >
        <Hidden xsDown>
          <Paper {...rest} className={clsx(classes.root, props.className)} elevation={1} square>
            {navbarContent}
          </Paper>
        </Hidden>
      </Drawer>
    </Fragment>
  );
};

export default NavBar;
