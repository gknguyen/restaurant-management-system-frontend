import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../redux/commonReducers/actions';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Box, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: 480,
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    maxWidth: 480,
    flexBasis: 480,
  },
  textField: {
    background: '#FFFFFF',
  },
  searchButton: {
    background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
    color: 'white',
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  isDisable: boolean;
  sendDisableFlag: Function;
  sendSearchValue: Function;
}

const SearchBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = React.useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // props.searchProductList(props.searchValue);
    props.sendSearchValue(searchValue);
  };

  return (
    <form className={classes.search} onSubmit={searchHandler}>
      <Grid container={true}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          size="small"
          type="search"
          variant="outlined"
          onChange={changeHandler}
        />
      </Grid>
      {/* <Button className={classes.searchButton} onClick={searchHandler} size="medium" variant="contained">
        <SearchIcon />
      </Button> */}

      {/** submit button */}
      <input id="search-button" type="submit" style={{ display: 'none' }} />
      <label htmlFor="search-button">
        <Button
          fullWidth={true}
          variant="contained"
          size="medium"
          component="span"
          className={classes.searchButton}
          disabled={props.isDisable}
        >
          {!props.isDisable ? <SearchIcon /> : <LinearProgress />}
        </Button>
      </label>
    </form>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    isDisable: state.commonReducer.isDisable,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDisableFlag: (isDisable: boolean) => {
      dispatch(commonActions.actionDisableFlag(isDisable));
    },
    sendSearchValue: (searchValue: string) => {
      dispatch(commonActions.actionReceiveSearchValue(searchValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
