import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from 'react-redux';
import * as productActions from '../../redux/reducers/productReducers/actions';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: 480,
  },
  textField: {
    background: '#FFFFFF',
  },
}));

interface Props {
  sendSearchValue: Function;
}

const SearchBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.sendSearchValue(event.target.value);
  };

  return (
    <Grid container={true}>
      <TextField
        className={classes.textField}
        fullWidth={true}
        size='small'
        type='search'
        variant='outlined'
        onChange={changeHandler}
      />
    </Grid>
  );
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendSearchValue: (searchValue: string) => {
      dispatch(productActions.actionReceiveSearchValue(searchValue));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
