
import { ADD_SPOT_FAILURE, ADD_SPOT_REQUEST, ADD_SPOT_SUCCESS,
	 DELETE_SPOT_FAILURE, DELETE_SPOT_REQUEST, DELETE_SPOT_SUCCESS, EDIT_SPOT_FAILURE,
	  EDIT_SPOT_REQUEST, EDIT_SPOT_SUCCESS, GET_SPOTS_FAILURE, GET_SPOTS_REQUEST,
		 GET_SPOTS_SUCCESS, GET_SPOT_FAILURE, GET_SPOT_REQUEST, GET_SPOT_SUCCESS, 
		  SORT_SPOTS_BY_PRICE_REQUEST, SORT_SPOTS_BY_PRICE_SUCCESS } from "../actionTypes";
import baseApi, { multipartAPi } from "../baseUrl/baseApi";

export const getAllSpots = () => async (dispatch) => {
	dispatch({ type: GET_SPOTS_REQUEST });
	try {
		const { data } = await baseApi.get('/spots');
		dispatch({ type: GET_SPOTS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_SPOTS_FAILURE, payload: error.message });
	}
};

export const getASpot = (id) => async (dispatch) => {
	dispatch({ type: GET_SPOT_REQUEST });
	try {
		const { data } = await baseApi.get(`/spots/${id}`);
		dispatch({ type: GET_SPOT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_SPOT_FAILURE, payload: error.message });
	}
};

export const addSpot = (spot) => async (dispatch) => {
	dispatch({ type: ADD_SPOT_REQUEST });
	try {
		const { data } = await multipartAPi.post('/spots', spot);
		dispatch({ type: ADD_SPOT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ADD_SPOT_FAILURE, payload: error.message });
	}
};

export const editSpot = (id, spot) => async (dispatch) => {
	dispatch({ type: EDIT_SPOT_REQUEST });
	try {
		const { data } = await multipartAPi.put(`/spots/${id}`, spot);
		dispatch({ type: EDIT_SPOT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: EDIT_SPOT_FAILURE, payload: error.message });
	}
};

export const deleteSpot = (id) => async (dispatch) => {
	dispatch({ type: DELETE_SPOT_REQUEST });
	try {
		await baseApi.delete(`/spots/${id}`);
		dispatch({ type: DELETE_SPOT_SUCCESS, payload: id });
	} catch (error) {
		dispatch({ type: DELETE_SPOT_FAILURE, payload: error.message });
	}
};

export const sortSpotsByPrice = (minPrice, maxPrice) => async (dispatch) => { 
	dispatch({ type: SORT_SPOTS_BY_PRICE_REQUEST })

	try {
		const { data } = await baseApi.get(`/sort_spots_by_price?`, { params: 
			{  min_price: minPrice, max_price: maxPrice} 
		});
		dispatch({ type: SORT_SPOTS_BY_PRICE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: GET_SPOTS_FAILURE, payload: error.message });
	}
}


