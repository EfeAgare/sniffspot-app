import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function CommentRating({value, setRating}) {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2, mb: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'Center',
        alignItem: 'center'
      }}
    >
     <Rating name="rating" defaultValue={0} 
       precision={1} 
       value={value}
       onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </Box>

  );
}
