import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextArea from './textArea';

const useStyles = makeStyles((theme) => ({
  textFieldBox: {
    width: '100%',
  },
  error: {
    color: '#ff0000',
    float: 'left',
    fontSize: '13px',
  },
}));

export const InputFieldType = {
  Username: 'username',
  Email: 'email',
  Password: 'password',
  ProjectId: 'projectId',
  ProjectName: 'projectName',
  SearchProjectName: 'searchProjectName',
  ProjectPurpose: 'projectPurpose',
  ProjectOverview: 'projectOverview',
  ProjectResult: 'projectResult',
};

const InputTextField = ({
  name,
  type,
  placeHolder,
  id,
  disable,
  onInputChangeCallBack,
  errorForm,
  defaultValue,
}) => {
  const classes = useStyles();
  // const [checkError, setCheckError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [messageID, setMessageID] = React.useState('');
  const [setMessageID] = React.useState('');
  const [inputType, setInputType] = React.useState('text');
  const [inputValue, setInputValue] = React.useState('');
  const [init, setInit] = React.useState(false);
  React.useEffect(() => {
    setMessageID(id + type.toString());
    setInputValue(defaultValue);
    if (type === InputFieldType.Password) setInputType('password');
  }, [defaultValue, id, setMessageID, type]);
  const onInputChangeHandler = (event) => {
    const value = event.target.value.toString();

    if (type === InputFieldType.SearchProjectName) {
      if (Validate(value)) {
        setInputValue(value);
      }
    } else {
      setInputValue(value);
    }

    console.log('value : ' + value);

    if (Validate(value)) {
      onInputChangeCallBack(event);
    }
  };

  if (
    defaultValue !== null &&
    defaultValue.length > 0 &&
    defaultValue !== inputValue &&
    init === false
  ) {
    setInputValue(defaultValue);
    setInit(true);
  }

  const Validate = (value) => {
    // console.log('-------VALIDATE-------');

    switch (type) {
      case InputFieldType.Password: {
        if (value === '' || value === null) {
          setErrorMessage('パスワードは空にできません');
          return false;
        } else if (value.length < 3) {
          setErrorMessage('パスワードは3文字以上にする必要があります');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.Username: {
        if (value === '' || value === null) {
          setErrorMessage('ユーザー名は空にできません');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.Email: {
        if (value === '' || value === null) {
          setErrorMessage('電子メールは空であってはなりません');
          return false;
        } else if (value !== '*@*') {
          setErrorMessage('メールの形式が正しくありません');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.ProjectId: {
        if (value === '' || value === null) {
          setErrorMessage('プロジェクトIDは空にできません');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.ProjectName: {
        if (value === '' || value === null) {
          setErrorMessage('プロジェクト名は空にできません');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.ProjectPurpose: {
        if (value === '' || value === null) {
          setErrorMessage('プロジェクトの目的は空欄にできません');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.ProjectOverview: {
        // console.log(value);
        if (value === '' || value === null) {
          setErrorMessage('プロジェクト概要は空欄にできません');
          return false;
        } else {
          setErrorMessage('  ');
          return true;
        }
      }
      case InputFieldType.SearchProjectName: {
        // console.log(value);
        if (value.length > 50) {
          return false;
        }
        return true;
      }
      default: {
        console.log('default case');
      }
    }
    return true;
  };

  if (errorForm.purpose && type === InputFieldType.ProjectPurpose) {
    Validate(inputValue);
    errorForm.purpose = false;
  }
  if (errorForm.overview && type === InputFieldType.ProjectOverview) {
    Validate(inputValue);
    errorForm.overview = false;
  }
  if (errorForm.projectResult && type === InputFieldType.ProjectResult) {
    Validate(inputValue);
    errorForm.projectResult = false;
  }
  if (errorForm.projectName && type === InputFieldType.ProjectName) {
    Validate(inputValue);
    errorForm.projectName = false;
  }
  if (errorForm.projectId && type === InputFieldType.ProjectId) {
    Validate(inputValue);
    errorForm.projectId = false;
  }
  if (errorForm.email && type === InputFieldType.Email) {
    Validate(inputValue);
    errorForm.email = false;
  }

  const inputTextFieldDIV = (
    <input
      type={inputType}
      name={name}
      placeholder={placeHolder}
      className='form-control'
      id={id}
      value={inputValue}
      disabled={disable}
      onChange={onInputChangeHandler}
    />
  );

  const inputTextAreaDIV = (
    // <TextareaAutosize
    //   aria-label='minimum height'
    //   rowsMin={2}
    //   className='form-control'
    //   placeholder={placeHolder}
    //   type={inputType}
    //   name={name}
    //   id={id}
    //   value={inputValue}
    //   disabled={disable}
    //   onChange={onInputChangeHandler}
    // />
    <TextArea
      name={name}
      onInputChangeCallBack={onInputChangeHandler}
      defaultValue={inputValue}
    />
  );

  let inputDiv = inputTextFieldDIV;
  if (
    type === InputFieldType.ProjectPurpose ||
    type === InputFieldType.ProjectOverview ||
    type === InputFieldType.ProjectResult
  ) {
    inputDiv = inputTextAreaDIV;
  }

  return (
    <div className={classes.textFieldBox}>
      {inputDiv}
      <span id={inputType} className={classes.error}>
        {errorMessage}
      </span>
    </div>
  );
};

export default InputTextField;
