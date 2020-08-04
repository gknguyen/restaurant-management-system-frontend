/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';
import useRouter from '../../components/utils/userRouter';
import NavigationListItem from './components/navigationListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
}));

const NavigationList = (props: { [x: string]: any; pages: any }) => {
  const { pages, ...rest } = props;

  return (
    <List>
      {pages.reduce((items: any, page: any) => reduceChildRoutes({ items, page, ...rest }), [])}
    </List>
  );
};

NavigationList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array,
  router: PropTypes.object,
};

const reduceChildRoutes = (props: { router?: any; items: any; page: any; depth?: any }) => {
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

interface Props {
  [x: string]: any;
  title: any;
  pages: any;
  component: any;
  className?: any;
}

const Navigation: React.FC<Props> = (props) => {
  const { title, pages, className, component: Component, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();

  return (
    <Component {...rest} className={clsx(classes.root, className)}>
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList depth={0} pages={pages} router={router} />
    </Component>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string,
};

Navigation.defaultProps = {
  component: 'nav',
};

export default Navigation;
