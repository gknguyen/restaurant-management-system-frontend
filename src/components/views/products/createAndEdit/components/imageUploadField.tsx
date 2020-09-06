import { colors } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ImagesDropZone from '../../../../../commons/imageDropZone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      padding: '0 5px 10px 5px',
      width: '100%',
    },
    card: {
      width: '100%',
      height: '100%',
    },
    typography: {
      padding: '0 0 10px 0',
    },
    imagesDropZone: {
      height: 380,
      border: `1px dashed ${theme.palette.divider}`,
      padding: '0 50px 0px 50px',
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: colors.grey[50],
        cursor: 'pointer',
      },
    },
  }),
);

const ImageUploadField: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      className={classes.grid}
      container={true}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {/** header */}
      <Grid container={true} justify="flex-start">
        <Typography className={classes.typography} component="h1" variant="h6">
          Image Upload:
        </Typography>
      </Grid>

      {/** contents */}
      <Grid container={true} justify="center" className={classes.imagesDropZone}>
        <ImagesDropZone />
      </Grid>
    </Grid>
  );
};

export default ImageUploadField;
