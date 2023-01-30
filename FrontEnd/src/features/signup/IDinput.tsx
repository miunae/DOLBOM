import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import propTypes from 'prop-types';
import React, { useState } from 'react';

const IDinput = ({
  setIdValidate,
  setUserId,
}: {
  setIdValidate: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [id, setId] = useState('');
  const [idLenCheck, setIdLenCheck] = useState(0);
  const [idHelperText, setIdHelperText] = useState('');
  const [, setDupCheck] = useState(false);
  const [error, setError] = useState(false);

  const idValidate = (id: string) => {
    if (id.length <= 0) {
      window.alert('아이디는 필수 입력항목입니다.');
    } else {
      axios.get(`http://localhost:8080/api/users/idCheck/${id}`).then((res) => {
        if (res.data.isExist) {
          setDupCheck(true);
          setIdHelperText('중복아이디 입니다.');
        } else if (!res.data.isExist) {
          setIdHelperText('사용가능한 아이디입니다.👍');
          setIdValidate(true);
          setUserId(id);
        }
      });
    }
  };
  const isIdEmpty = () => {
    !id.length && window.alert('아이디는 필수입력 사항 입니다.');
  };
  const HelperText = () => {
    if (idLenCheck > 16) {
      setIdHelperText('16자 이하로 입력하세요');
      setError(true);
    } else {
      setIdHelperText('');
      setError(false);
    }
  };

  return (
    <TextField
      error={error}
      margin="dense"
      id={'ID'}
      label="아이디를 입력하세요*"
      type="text"
      helperText={idHelperText}
      fullWidth
      variant="standard"
      onChange={(e) => {
        setId(e.target.value);
        setIdLenCheck(e.target.value.length);
        HelperText();
        setDupCheck(false);
        setIdValidate(false);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              onClick={() => {
                isIdEmpty();
                setDupCheck(true);
                idValidate(id);
              }}
            >
              중복체크
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

IDinput.propTypes = {
  setIdValidate: propTypes.func,
  setUserId: propTypes.func,
};

export default IDinput;
