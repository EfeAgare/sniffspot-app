import { ADD_REVIEW_FAILURE, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, 
	DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS,
	 EDIT_REVIEW_FAILURE, EDIT_REVIEW_REQUEST, EDIT_REVIEW_SUCCESS } from "../actionTypes";
import baseApi from "../baseUrl/baseApi";

// Review action creators
export const addReview = (id, review) => async (dispatch) => {
	dispatch({ type: ADD_REVIEW_REQUEST });
	try {
		const { data } = await baseApi.post(`/spots/${id}/reviews`, review);
		dispatch({ type: ADD_REVIEW_SUCCESS, payload: { id: id, review: data } });
	} catch (error) {
		dispatch({ type: ADD_REVIEW_FAILURE, payload: error.message });
	}
};

export const editReview = (spotId, id, review) => async (dispatch) => {
	dispatch({ type: EDIT_REVIEW_REQUEST });
	try {
		const { data } = await baseApi.put(`/spots/${spotId}/reviews/${id}`, review);
		dispatch({ type: EDIT_REVIEW_SUCCESS, payload:  data  });
	} catch (error) {
		dispatch({ type: EDIT_REVIEW_FAILURE, payload: error.message });
	}
};

export const deleteReview = (spot_id, id) => async (dispatch) => {
	dispatch({ type: DELETE_REVIEW_REQUEST });
	try {
		await baseApi.delete(`/spots/${spot_id}/reviews/${id}`);
		dispatch({ type: DELETE_REVIEW_SUCCESS, payload: id });
	} catch (error) {
		dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message });
	}
};



