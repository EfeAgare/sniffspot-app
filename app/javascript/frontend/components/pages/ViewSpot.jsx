import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASpot } from "../../redux/actions/spotActions";
import ReviewForm from "../common/ReviewForm";
import { Item } from "./Home";
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import CommentRating from "../container/CommentRating";
import { addReview, deleteReview } from "../../redux/actions/reviewActions";
import { SpotImageCarousel } from "../container/SpotImageCarousel";
import EditReviewModal from "../common/EditReviewModal";

const ViewSpot = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [review, setReview] = useState({});
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let params = useParams();

  const spot = useSelector((state) => state.spots?.spot);

  const dispatch = useDispatch()

  useEffect(() => {
    if (params?.id) {
     dispatch(getASpot(params?.id))
    }
    return () => {}
  }, [])

  const handleSubmit = () => {
    const data = {
      review: {
        rating: rating,
        content: content
      }
    }
    dispatch(addReview(spot.id, data))
    setRating(rating),
    setContent("")
  } 

  const handleToggle =() => {
    setShowCommentBox((prev)=> !prev)
  }

  const handleDelete = (e, spotId, reviewId) => {
    e.preventDefault()
    dispatch(deleteReview(spotId, reviewId))
  }

  const handleEditReview = (id) =>  {
    const newSpot = spot.reviews.filter(item => item.id == id)
    setReview(newSpot[0])
    handleOpen()
  }

  if (!spot) return <Item><div>Loading...</div></Item>;

  return (
    <>
    <Box sx={{
      width: 800,
      margin: "0 auto"
    }}>
      <SpotImageCarousel images={spot.images} show={false}/>
     <Typography gutterBottom variant="h5" component="div">
          {spot.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {spot.description}
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Price: $ {spot.price}
        </Typography>
      </Box>
      <Box>
        <Box sx={{
          mt: 5
        }}>
           <Typography component="h1" variant="h5" sx={{ml: 5}}>
            Comments
          </Typography>
          </Box>
         <hr/>
       
       <Grid container spacing={2}>
        <Grid item xs={4}>
        <Button variant="outlined" sx={{ml: 5, mb: 3}} onClick={()=> handleToggle()}>Add Comment</Button>
          { showCommentBox ? <>
        <CommentRating rating={rating} setRating={setRating}/>
          <StyledEngineProvider injectFirst>
            <CssVarsProvider>
              <ReviewForm content={content} setContent={setContent} handleSubmit={handleSubmit}/>
            </CssVarsProvider>
        </StyledEngineProvider>
        </>: null}
        <Divider orientation="vertical" flexItem />
  </Grid>
  
  <Grid item xs={8} sx={{
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  }}>

    {spot.reviews  && spot.reviews.length > 0 && spot.reviews.map((review, key )=>
    <Card sx={{ width: "30%", mr:1, ml:1, mt:1, mb:1, cursor: 'pointer' }} key={key}>
      <CardContent>
         <Typography gutterBottom variant="h5" component="div">
          <Rating name="rating" value={review.rating} precision={0.5}  readOnly/>
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {review.content}
        </Typography>
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
          <Button variant="text" color="error" onClick={(e)=> {e.preventDefault(); handleDelete(e, spot.id, review.id)}}> Delete</Button>
          <Button variant="text" onClick={()=>  handleEditReview(review.id)}> Edit</Button>
      </CardActions>      
    </Card>
    )}
  </Grid>
</Grid>
     
      </Box>

{open &&
      <EditReviewModal id={spot.id} open={open} handleClose={handleClose} review={review}/> }
    </>
  )
}

export default ViewSpot
