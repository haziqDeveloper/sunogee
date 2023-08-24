/** @format */

// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import "./Media.css";
import { Toaster } from "react-hot-toast";
import "./assets/css/custom.css"

// ----------------------------------------------------------------------

export default function App() {
	return (
		<ThemeProvider>
			<ScrollToTop />
			<Router />
			<Toaster position="top-right" reverseOrder={false} />
		</ThemeProvider>
	);
}
