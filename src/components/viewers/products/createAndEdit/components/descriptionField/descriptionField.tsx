import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as productActions from '../../../../../../redux/reducers/productReducers/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      padding: '0 5px 10px 5px',
      width: '100%',
    },
    textAreaBox: {
      width: '100%',
      padding: '10px',
    },
    typography: {
      padding: '0 0 10px 0',
    },
  }),
);

interface Props {
  description: string;
  sendDescriptionValue: Function;
}

const DescriptionField: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const descriptionDefaultValue = props.description;

  const descriptionChangeHandler = (event: any) => {
    props.sendDescriptionValue(event.target.value);
  };

  return (
    <Grid className={classes.grid} container={true} item={true} xs={true}>
      <Typography className={classes.typography} component='h1' variant='h6'>
        Description:
      </Typography>
      <TextareaAutosize
        className={classes.textAreaBox}
        rowsMin={3}
        aria-label='empty textarea'
        placeholder='Empty'
        defaultValue={descriptionDefaultValue}
        onChange={descriptionChangeHandler}
      />
    </Grid>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    description: state.productReducer.product.description,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendDescriptionValue: (descriptionValue: string) => {
      dispatch(productActions.actionReceiveDescriptionValue(descriptionValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionField);
