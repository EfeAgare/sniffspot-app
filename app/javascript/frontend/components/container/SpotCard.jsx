import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { SpotImageCarousel } from "./SpotImageCarousel";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SpotCard = ({item, handleDelete, handleEditRedirect})=>{
	const navigate = useNavigate();

  const [averageReview, setAverageReview] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  
  useEffect(() => {
		if (item && item?.reviews && item?.reviews?.length > 0) {
			let total = 0;
			item.reviews.forEach(review => (total += review.rating));
			setAverageReview(total / item.reviews.length);
			setTotalReviews(item.reviews.length);
		}
	  }, [item])

  return (
    <Card sx={{ width: "30%", mr:1, ml:1, mt:1, mb:1, cursor: 'pointer' }} >
      <Box onClick={()=> navigate(`/spot/${item.id}`)}>
     <SpotImageCarousel images={item.images}/>
      <CardContent>
         <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {item.description.length > 100 ? item.description.substring(0,100) + "..." : item.description}
        </Typography>
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="body2" color="text.secondary">
        <IconButton aria-label="AttachMoney">
          <AttachMoneyIcon />
        </IconButton>
         {item.price}
        </Typography>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}> 
          <IconButton aria-label="Review">
            <StarIcon />
          </IconButton>
           {averageReview ? `${averageReview.toFixed(2)}` : ""}
          <Typography sx={{
            ml: 3
          }}>
            {totalReviews > 0 ? totalReviews : '' }
          </Typography>
        </Box>
      </CardActions>
       </Box>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}> 
           <Button variant="text" color="error" onClick={()=> handleDelete(item.id)}> Delete</Button>
           <Button variant="text" onClick={()=> 
             handleEditRedirect(item.id)
            }> Edit</Button>
        </Box>
    </Card>
  );
}

export default SpotCard