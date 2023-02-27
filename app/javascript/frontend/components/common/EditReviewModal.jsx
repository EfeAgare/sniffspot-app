import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CommentBox from "../container/CommentBox";
import CommentRating from "../container/CommentRating";
import { useDispatch } from "react-redux";
import { editReview } from "../../redux/actions/reviewActions";
import { Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0.1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditReviewModal({id, open, handleClose, review}) {

  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);

  const dispatch = useDispatch()

  const handleSubmit = () => {
    const data = {
      review: {
        rating: rating,
        content: content
      }
    }
    dispatch(editReview(id, review.id, data))
    setRating(rating),
    setContent(content)
  } 

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CommentRating value={rating} setRating={setRating}/>
          <CommentBox handleSubmit={handleSubmit} content={content} setContent={setContent} update={true}/>
        </Box>
      </Modal>
     
    </div>
  );
}