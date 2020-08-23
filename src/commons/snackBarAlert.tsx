import Snackbar from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';
import React, { useState } from 'react';

interface Props {
  duration: number;
  severty: Color;
  message: string;
}

const SnackbarAlert: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={props.duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.severty}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
