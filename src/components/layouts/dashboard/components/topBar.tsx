import { Box, Divider, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as commonActions from '../../../../redux/commonReducers/actions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getdUserInfo } from '../../../../configs/localStore';
import Cart from '../../../views/home/cart';
import { OrderDetail } from '../../../../configs/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
    },
    appBar: {
      background: 'linear-gradient(45deg, #4e342e 30%, #a1887f 90%)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      alignSelf: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    divider: {
      width: 3,
      backgroundColor: 'white',
    },
  }),
);

interface Props {
  /** redux params */
  navBarOpenFlag: boolean;
  productInCartNumber: number;
  isDisable: boolean;
  /** redux functions */
  sendNavBarOpenFlag: Function;
}

const TopBar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const userInfo = getdUserInfo();

  const [cartOpen, setCartOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    history.push('/auth/login');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted={true}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box className={classes.root}>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          {/** tabBar menu */}
          <Box className={classes.sectionDesktop}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => props.sendNavBarOpenFlag(!props.navBarOpenFlag)}
            >
              {props.navBarOpenFlag ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>

            {/** app name */}
            <Typography className={classes.title} variant="h6" noWrap={true}>
              GK's bar
            </Typography>
          </Box>

          <Box className={classes.sectionDesktop}>
            {/** cart */}
            <IconButton
              color="inherit"
              onClick={() => setCartOpen(true)}
              disabled={props.isDisable}
            >
              <Badge badgeContent={props.productInCartNumber} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/** mail */}
            <IconButton color="inherit" disabled={props.isDisable}>
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>

            {/** notification */}
            <IconButton color="inherit" style={{ paddingRight: 50 }} disabled={props.isDisable}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/** profile */}
            <Typography className={classes.title} variant="h6" noWrap={true}>
              {userInfo.username}
            </Typography>
            <IconButton
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              disabled={props.isDisable}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/** profile menu */}
      {renderMenu}

      {/** cart */}
      <Cart open={cartOpen} cancelCallBack={() => setCartOpen(false)} />
    </Box>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    navBarOpenFlag: state.commonReducer.navBarOpenFlag,
    productInCartNumber: state.orderReducer.order.orderDetails.length,
    isDisable: state.commonReducer.isDisable,
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

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
