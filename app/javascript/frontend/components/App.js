import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/Header";
import HeaderSection from "./container/HeaderSection";
import CreateSpot from "./pages/CreateSpot";
import Home from "./pages/Home";

const App = () => {
	return (

		<BrowserRouter>
			<Header />
			<HeaderSection />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/spot/create" element={<CreateSpot />} />
				<Route path="*" element={<Home />} />
			</Routes>

		</BrowserRouter>
	);
};

export default App;
