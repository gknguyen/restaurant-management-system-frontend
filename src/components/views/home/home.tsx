import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
      padding: '30px 40px 40px 40px',
      display: 'flex',
      flexWrap: 'wrap',
      // maxWidth: 1200,
    },
  }),
);

interface Props {}

const Home: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {}, []);

  return (
    <Container maxWidth="xl">
      <Grid className={classes.grid} container={true} spacing={2} direction="column">
        {/** header */}
        <Grid container={true} item={true} xs={12}>
          <Typography component="h1" variant="h4">
            Home
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
