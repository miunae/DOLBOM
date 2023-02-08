import { Button } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
export const AddFileButton = () => {
  const [filesToUpload, setFilesToUpload] = useState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const URL = import.meta.env.VITE_ADD_FILE_URL;
  const handleFileChange = async (e: any) => {
    // Update chosen files
    e.preventDefault();
    const files = e.target.files[0];
    // setFilesToUpload(files);
    console.log(files);
    const formData = new FormData();
    const data = {
      name: files.name,
      type: files.type,
    };
    formData.append('files', files);
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    await axios({
      method: 'post',
      url: URL,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => console.log(formData));
  };
  return (
    <>
      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e)}
          hidden
        />
      </Button>
    </>
  );
};
