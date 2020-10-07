import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as APIs from '../../../../configs/APIs';
import { apiGet } from '../../../../configs/axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
);

interface Props {}

const OrderDetails: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    const historyState = history.location.state as any;
    const orderId = historyState.orderId;
    console.log({ orderId });
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            Order Details
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {};
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
