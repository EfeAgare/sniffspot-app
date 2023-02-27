import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { sortSpotsByPrice } from "../../redux/actions/spotActions";

const marks = [
  {
    value: 5,
    label: '$5',
  },
  {
    value: 100,
    label: '$100',
  },
];
function valuetext(value) {
  return `$${value}`;
}

export default function PriceSlider() {
  const [value, setValue] = React.useState([5, 100]);
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  const handlePriceSort = () => {
    dispatch(sortSpotsByPrice(value[0], value[1]))
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 5,
        mb: 2,
        ml:2,
        mr: 2
      }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Price ($)
        </Typography>

        <Button variant="text" onClick={() => handlePriceSort()}> Apply</Button>
      </Box>
      <Box sx={{ mb: 8, mr: 2, ml: 2 }}>
        <Slider
          getAriaLabel={() => 'Price Range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          marks={marks}
          min={5}
          getAriaValueText={valuetext}
        />
      </Box>
    </>
  );
}