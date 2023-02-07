import './TextareaDec.css';

import { Button } from '@material-ui/core';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import React from 'react';

export default function TextareaDec() {
  const [text, setText] = React.useState(''); // textarea의 값은 text로 담는다.
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  return (
    <div id="memoContainer">
      <Textarea
        placeholder="메모장"
        value={text}
        onChange={(event) => setText(event.target.value)}
        minRows={15} // 처음 보이는 메모장 크기
        maxRows={15} // 15줄을 넘어가면 스크롤로 표시될거야.
        startDecorator={
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
              👍
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
              🏖
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
              😍
            </IconButton>
          </Box>
        }
        endDecorator={
          <Typography level="body3" sx={{ ml: 'auto' }}>
            글자수: {text.length}
            <Button id="text_save" variant="contained">
              메모 저장하기
            </Button>
          </Typography>
        }
        sx={{ minWidth: 300 }}
      />
    </div>
  );
}
