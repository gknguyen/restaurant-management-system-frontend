/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';
import useRouter from '../../configs/userRouter';
import NavigationListItem from './components/navigationListItem';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/commonReducers/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
}));

interface NavigationListProps {
  depth: number;
  pages: any[];
  router: object;
}

const NavigationList: React.FC<NavigationListProps> = (props) => {
  const { ...rest } = props;

  return (
    <List>
      {props.pages.reduce(
        (items: any, page: any) => reduceChildRoutes({ items, page, ...rest }),
        [],
      )}
    </List>
  );
};

interface ReduceChildRoutesProps {
  /** params */
  router?: any;
  items: any;
  page: any;
  depth?: any;
  /** redux params */
  navBarOpenFlag?: boolean;
}

const reduceChildRoutes: React.FC<ReduceChildRoutesProps> = (props) => {
  const { router, items, page, depth } = props;

  if (page.children) {
    const open = matchPath(router.location.pathname, {
      path: page.href,
      exact: false,
    });

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList depth={depth + 1} pages={page.children} router={router} />
      </NavigationListItem>,
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />,
    );
  }

  return items;
};

interface NavigationProps {
  /** params */
  [x: string]: any;
  title: string;
  pages: any[];
  component: any;
  className?: string;
  /** redux params */
  navBarOpenFlag: boolean;
  /** redux functions */
  // sendNavBarOpenFlag: Function;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const { title, pages, className, component: Component, navBarOpenFlag, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();

  return (
    <Component {...rest} className={clsx(classes.root, className)}>
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList depth={0} pages={pages} router={router} />
    </Component>
  );
};

Navigation.defaultProps = {
  component: 'nav',
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
    // sendNavBarOpenFlag: (navBarOpenFlag: boolean) => {
    //   dispatch(commonActions.actionReceiveNavBarOpenFlag(navBarOpenFlag));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
