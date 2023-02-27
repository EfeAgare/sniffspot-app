import React, { useEffect } from 'react';
import SpotForm from "../common/SpotForm";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getASpot } from "../../redux/actions/spotActions";
import { Typography } from "@mui/material";
import { Item } from "./Home";


const CreateSpot =  () => {

  let params = useParams();

  const spots = useSelector((state) => state.spots);

  const dispatch = useDispatch()

  useEffect(() => {
    if (params?.id) {
     dispatch(getASpot(params?.id))
    }
    return () => {}
  }, [])
 
  return (
    <>
    {spots.isLoading ? < Item><Typography>Loading...</Typography></Item> :
    <>{params?.id ? <SpotForm editMode={true} spot={spots.spot}/> :  <SpotForm  editMode={false}/>}</>}
   </>
  );
}
export default CreateSpot