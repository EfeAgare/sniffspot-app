import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageUploader from "../container/ImageUploader";
import { useDispatch } from "react-redux";
import { addSpot, editSpot } from "../../redux/actions/spotActions";
import {  useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Sniffspot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SpotForm({editMode, spot}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const [price, setPrice] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  // Load existing data for editing
  useEffect(() => {
    if (editMode && spot && spot?.id) {
      setFormData({
        title: spot?.title,
        description: spot?.description
      });
      setPrice(spot?.price)
      setImageFiles([])
    }
  }, [editMode,  spot]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  const handlePriceChange = (e) => {
    const re = /^[1-9]\d*(\.\d+)?$/;
		if (re.test(e.target.value) || e.nativeEvent.inputType == 'deleteContentBackward') {
			setPrice(e.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, description } = formData;
    if (!title && !description && !price) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert file objects to FormData for multipart/form-data request
    const formDataWithFiles = new FormData();
    formDataWithFiles.append("spot[title]", title);
    formDataWithFiles.append("spot[description]", description);
    formDataWithFiles.append("spot[price]", price);
    
    for (let i = 0; i < imageFiles.length; i++) {
      formDataWithFiles.append("spot[images][]", imageFiles[i]);
    }

    if (editMode && spot?.id) {
      dispatch(editSpot(spot.id, formDataWithFiles));
       return navigate(`/spot/${spot.id}`);
    } else {
      dispatch(addSpot(formDataWithFiles)); 
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {spot ? "Update " : "Create "} Spot
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price ($)"
                  type="price"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ImageUploader handleImages={setImageFiles} images={imageFiles}/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
             {spot ? "Update " : "Create "}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
