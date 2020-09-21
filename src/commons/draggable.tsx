import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import React from 'react';

const DraggableDialog: React.FC = (props: PaperProps) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

export default DraggableDialog;
