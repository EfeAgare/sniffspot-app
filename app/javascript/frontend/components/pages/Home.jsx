import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PriceSlider from "../helper/PriceSlider";
import SpotCard from "../container/SpotCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpot, getAllSpots } from "../../redux/actions/spotActions";
import { useNavigate } from "react-router-dom";

export const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Home = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate()

	const spots = useSelector((state) => state.spots);

	useEffect(() => {
		dispatch(getAllSpots())
		return () => {
		}
	}, [])

	const handleDelete = (id) => {
		dispatch(deleteSpot(id))
	}

	const handleEditRedirect = (id) => navigate(`/spots/${id}/edit`)

	return (
		<Box sx={{ flexGrow: 1, margin: 3 }}>
			<Box sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-evenly",
				flexWrap: "wrap"
			}}>
				<Box sx={{ flex: 1 }}>
					<Item>
						<PriceSlider />
					</Item>
				</Box>
				<Box sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					flexWrap: "wrap",
					flex: 6
				}}>

					{spots.isLoading ? (
						<Box sx={{ flex: 1, mb: 8, mr: 2, ml: 2 }}>
							<Item>
								<Typography>Loading</Typography>
							</Item>
						</Box>
					) : null}

					<>
						{!spots.isLoading && spots.spots.length > 0
							? spots.spots.map((spot, id) => (
								<SpotCard key={id} item={spot} handleDelete={handleDelete} handleEditRedirect={handleEditRedirect} />
							))
							: !spots.isLoading && spots.spots.length == 0 && <Box sx={{ flex: 1, mb: 8, mr: 2, ml: 2 }}>
								<Item>
									<Typography>No Spot Available</Typography>
								</Item>
							</Box>}
					</>

				</Box>
			</Box>
		</Box>
	);
};

export default Home;
