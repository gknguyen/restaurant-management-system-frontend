import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import DraggableDialog from '../draggable';

interface Props {
  /** params */
  open: boolean;
  header: string;
  content: string;
  /** functions */
  confirmCallBack: Function;
  cancelCallBack: Function;
}

const ComfirmDialog: React.FC<Props> = (props) => {
  React.useEffect(() => {}, []);

  return (
    <Dialog
      open={props.open}
      onClose={() => props.cancelCallBack()}
      PaperComponent={DraggableDialog}
    >
      <DialogTitle id="draggable-dialog-title">{props.header}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.confirmCallBack()} color="primary">
          Yes
        </Button>
        <Button onClick={() => props.cancelCallBack()} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComfirmDialog;
