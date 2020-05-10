import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
  textAreaBox: {
    width: '100%',
  },
  error: {
    color: '#ff0000',
  },
}));

const TextArea = ({ name, onInputChangeCallBack, defaultValue }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {}, []);
  const onInputChangeHandler = (event) => {
    const value = event.target.value.toString();

    if (Validate(value)) {
      setInputValue(value);
      onInputChangeCallBack(event);
    }
  };

  const Validate = (value) => {
    console.log(value);
    if (value.length > 500) {
      return false;
    }
    return true;
  };

  return (
    <div className={classes.textAreaBox}>
      <TextareaAutosize
        aria-label='minimum height'
        rowsMin={5}
        name={name}
        className='form-control'
        placeholder=''
        type='text'
        id={name}
        value={defaultValue}
        onChange={onInputChangeHandler}
      />
    </div>
  );
};

export default TextArea;
