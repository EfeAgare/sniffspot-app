import { ADD_REVIEW_FAILURE, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS,
	 ADD_SPOT_FAILURE, ADD_SPOT_REQUEST, ADD_SPOT_SUCCESS, 
	 DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS,
	  DELETE_SPOT_FAILURE, DELETE_SPOT_REQUEST, DELETE_SPOT_SUCCESS, 
		EDIT_REVIEW_FAILURE, EDIT_REVIEW_REQUEST, EDIT_REVIEW_SUCCESS, 
		EDIT_SPOT_FAILURE, EDIT_SPOT_REQUEST, EDIT_SPOT_SUCCESS, GET_SPOTS_FAILURE,
		 GET_SPOTS_REQUEST, GET_SPOTS_SUCCESS, GET_SPOT_FAILURE, 
		 GET_SPOT_REQUEST, GET_SPOT_SUCCESS, SORT_SPOTS_BY_PRICE_REQUEST, 
		 SORT_SPOTS_BY_PRICE_SUCCESS } from "../actionTypes";

const initialState = {
	spots: [],
	isLoading: false,
	review: {},
	spot: {},
	error: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SPOTS_SUCCESS:
		case SORT_SPOTS_BY_PRICE_SUCCESS: {
			return { ...state, isLoading: false, spots: action.payload };
		}

		case GET_SPOT_REQUEST:
		case GET_SPOTS_REQUEST:
		case ADD_SPOT_REQUEST:
		case EDIT_SPOT_REQUEST:
		case DELETE_SPOT_REQUEST:
		case ADD_REVIEW_REQUEST:
		case EDIT_REVIEW_REQUEST:
		case DELETE_REVIEW_REQUEST:
		case SORT_SPOTS_BY_PRICE_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case GET_SPOT_FAILURE:
		case GET_SPOTS_FAILURE:
		case ADD_SPOT_FAILURE:
		case EDIT_SPOT_FAILURE:
		case DELETE_SPOT_FAILURE:
		case ADD_REVIEW_FAILURE:
		case EDIT_REVIEW_FAILURE:
		case DELETE_REVIEW_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		case ADD_SPOT_SUCCESS: {
			const { payload } = action;

			const newSpots = [payload, ...state.spots];

			return {
				...state,
				spots: newSpots,
				isLoading: false,
			};
		}

		case ADD_REVIEW_SUCCESS: {

			const { payload } = action;

			let newSpot = { ...state.spot, reviews: [payload.review, ...state.spot.reviews] }

			return {
				...state,
				spot: newSpot,
				isLoading: false,
			};
		}

		case GET_SPOT_SUCCESS: {
			return { ...state, isLoading: false, spot: action.payload };
		}

		case EDIT_SPOT_SUCCESS: {
			const { payload } = action;

			const index = state.spots.findIndex(item => item.id === payload.id);

			const newSpots = [...state.spots];

			newSpots[index] = payload

			return {
				...state,
				spots: newSpots,
				isLoading: false,
			};
		}

		case EDIT_REVIEW_SUCCESS: {
			const { payload } = action;

			const index = state.spot.reviews.findIndex(item => item.id === payload.id);

			const newReview = [...state.spot.reviews];

			newReview[index] = payload

			let newSpot = { ...state.spot, reviews: [...newReview] }

			return {
				...state,
				spot: newSpot,
				isLoading: false,
			};
		}

		case DELETE_SPOT_SUCCESS: {
			const { payload } = action;

			const spots = state.spots.filter(item => item.id !== payload)

			return {
				...state,
				spots: spots,
				isLoading: false,
			};
		}

		case DELETE_REVIEW_SUCCESS: {
			const { payload } = action;

			const spot = {
				...state.spot, reviews: state.spot.reviews.filter(item => item.id !== payload)
			}
			return {
				...state,
				spot: spot,
				isLoading: false,
			};
		}

		default:
			return state;
	}
}
