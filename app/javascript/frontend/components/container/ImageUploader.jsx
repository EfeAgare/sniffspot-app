import { Button, Box } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const ImageUploader = ({ handleImages, images }) => {

  const [files, setFiles] = useState(images);

  const handleDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    console.log(files)
    handleImages((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    handleImages((prev) => prev.filter((_, i) => i !== index));
  };
  
  return (
    <>
      <Dropzone onDrop={handleDrop} multiple accept={{
      'image/jpeg': [],
      'image/png': []
    }
} >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()}/>
            <Button variant="outlined" >Drag 'n' drop some files here, or click to select files</Button>
          </div>
        )}
      </Dropzone>
      {files.length > 0 && (
        <>
          {files.map((file, index) => (
            <Box key={index} sx={{
              mt: 2
            }}>
              <span className="dragDropImage">{file.name}</span>
              <Button variant="outlined" onClick={() => handleRemove(index)}>
                Remove
              </Button>
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default ImageUploader;
