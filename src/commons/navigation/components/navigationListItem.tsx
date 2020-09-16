/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ListItem, Button, Collapse, colors } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { connect } from 'react-redux';
import * as commonActions from '../../../redux/commonReducers/actions';
import { constants } from 'buffer';

const useStyles = makeStyles((theme) => ({
  item: {
    width: '100%',
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    width: '100%',
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  buttonLeaf: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  icon: {
    // color: theme.palette.icon,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  expandIcon: {
    marginLeft: 'auto',
    height: 16,
    width: 16,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
  smallButton: {
    minWidth: '0px !important',
  },
}));

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

interface Props {
  /** params */
  title: string;
  href?: string;
  depth: number;
  children?: any;
  icon: any;
  className?: string;
  open?: boolean;
  label: any;
  key?: any;
  /** redux params */
  navBarOpenFlag: boolean;
  /** redux functions */
  sendNavBarOpenFlag: Function;
}

const NavigationListItem: React.FC<Props> = (props) => {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    className,
    open: openProp,
    label: Label,
    ...rest
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((open: any) => !open);
  };

  const paddingLeft = depth > 0 ? (props.navBarOpenFlag ? 20 : 0) + 8 * depth : 8;

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem {...rest} className={clsx(classes.item, className)} disableGutters>
        <Button
          className={classes.button}
          onClick={handleToggle}
          style={style}
          classes={{ root: classes.smallButton }}
        >
          {Icon && <Icon className={classes.icon} />}
          {props.navBarOpenFlag && title}
          {props.navBarOpenFlag &&
            (open ? (
              <ExpandLessIcon className={classes.expandIcon} color="inherit" />
            ) : (
              <ExpandMoreIcon className={classes.expandIcon} color="inherit" />
            ))}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem {...rest} className={clsx(classes.itemLeaf, className)} disableGutters>
        <Button
          activeClassName={classes.active}
          className={clsx(classes.buttonLeaf, `depth-${depth}`)}
          component={CustomRouterLink}
          exact
          style={style}
          to={href}
          classes={{ root: classes.smallButton }}
        >
          {Icon && <Icon className={classes.icon} />}
          {props.navBarOpenFlag && title}
          {Label && (
            <span className={classes.label}>
              <Label />
            </span>
          )}
        </Button>
      </ListItem>
    );
  }
};

NavigationListItem.defaultProps = {
  depth: 0,
  open: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationListItem);
