/** @format */

// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("dti#@"));

root.render(
	<HelmetProvider>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</HelmetProvider>,
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();
