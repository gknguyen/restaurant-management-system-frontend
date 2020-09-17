import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../redux/commonReducers/actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressBar: {
      width: '50%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

interface Props {
  /** redux params */
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
}

const LinearProgressBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid container={true} item={true} xs={12} alignItems="center" justify="center">
      {props.isDisable ? (
        <Box className={classes.progressBar}>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </Box>
      ) : (
        <Box></Box>
      )}
    </Grid>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinearProgressBar);
