// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import App from "../frontend/components/App";
import store from "../frontend/redux/store";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('root');

  const root = createRoot(container);
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
