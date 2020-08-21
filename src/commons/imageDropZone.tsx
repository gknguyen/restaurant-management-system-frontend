import {
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Grid,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { Fragment, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import bytesToSize from '../components/utils/bytesToSize';
import * as imageActions from '../redux/imageReducers/actions';
import Container from '@material-ui/core/Container';
import { AWS_S3_BUCKET_URL } from '../configs/constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  dropZone: {
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    width: 150,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const defaultFilesValue: File[] = [];

interface Props {
  errorMessage: string;
  sendImageFiles: Function;
}

const ImagesDropZone: React.FC<Props> = (props) => {
  const classes = useStyles();

  const errorMessage = props.errorMessage;
  const docImage = `${AWS_S3_BUCKET_URL}/undraw_add_file2_gvbb.svg`;

  const [images, setImages] = React.useState(defaultFilesValue);

  const handleDrop = useCallback((imageFiles: File[]) => {
    const imageFile = imageFiles[0];
    props.sendImageFiles(imageFile);
    setImages(imageFiles);
  }, []);

  const handleRemoveAll = () => {
    setImages([]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <Container className={classes.root}>
      <Box className={classes.dropZone} {...getRootProps()}>
        {images.length === 0 ? (
          <Fragment>
            <Grid container={true} direction="column" justify="center" alignItems="center">
              <input {...getInputProps()} />
              <img alt="Select file" className={classes.image} src={docImage} />
              <Typography className={classes.info} color="textSecondary" variant="body1">
                Drop an image here or click <Link underline="always">browse</Link>
                thorough your computer or laptop
              </Typography>
              <Typography className="text-danger">{errorMessage}</Typography>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <PerfectScrollbar options={{ suppressScrollX: true }}>
              <List className={classes.list}>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={images[0].name}
                  // primaryTypographyProps={{ variant: 'h5' }}
                  secondary={bytesToSize(images[0].size)}
                />
                <ListItem className={classes.actions}>
                  <Button onClick={handleRemoveAll} size="small">
                    Remove
                  </Button>
                </ListItem>
              </List>
            </PerfectScrollbar>
          </Fragment>
        )}
      </Box>
    </Container>
  );
};

/* collect data from redux store */
const mapStateToProps = (state: any) => {
  return {
    errorMessage: state.imageReducer.errorMessage,
  };
};

/* Send data to redux store */
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendImageFiles: (imageFiles: File) => {
      dispatch(imageActions.actionReceiveImageFiles(imageFiles));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesDropZone);
