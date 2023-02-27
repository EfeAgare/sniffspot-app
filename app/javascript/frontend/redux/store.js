import { configureStore } from "@reduxjs/toolkit";

import spotsReducer from "./reducers/spots";

const store = configureStore({
	reducer: {
		spots: spotsReducer,
	},
});

export default store;
