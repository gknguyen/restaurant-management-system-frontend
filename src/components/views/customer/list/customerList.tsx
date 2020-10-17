import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as commonActions from '../../../../redux/commonReducers/actions';
import * as APIs from '../../../../configs/APIs';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  }),
);

const headers = [
  { field: 'id', title: 'Id', hidden: true },
  { field: 'fullName', title: 'Name', sorting: false },
  { field: 'phoneNumber', title: 'Phone', sorting: false },
  { field: 'email', title: 'Email', sorting: false },
  { field: 'address', title: 'Address', sorting: false },
  { field: 'createDateTime', title: 'Create At', sorting: false },
];

interface Props {
  /** redux params */
  isDisable: boolean;
  /** redux functions */
  sendDisableFlag: Function;
}

const CustomerList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {}, []);

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container spacing={2} direction="row">
        <Grid container item xs={12}>
          <Typography component="h1" variant="h4">
            Customer List
          </Typography>
        </Grid>
      </Grid>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
