import MomentUtils from '@date-io/moment';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '../redux/store';
import AppRoutes from './AppRoutes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f5f5',
    },
  }),
);

const history: any = createBrowserHistory();
const store: any = configureStore();

const App: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "GK's Bar";
  }, []);

  return (
    <Container disableGutters maxWidth="xl" className={classes.root}>
      <StoreProvider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>{renderRoutes(AppRoutes)}</Router>
        </MuiPickersUtilsProvider>
      </StoreProvider>
    </Container>
  );
};

export default App;
