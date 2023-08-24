/** @format */

import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";
import Searchbar from "src/layouts/dashboard/Searchbar";
import DashboardNavbar from "../layouts/dashboard/DashboardNavbar";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => (
	<>
		<DashboardNavbar title={title} />
		<Helmet>
			<title>{`${title} | Ebox`}</title>
			{meta}
		</Helmet>

		<Box ref={ref} {...other} className="PageCardWidth">
			{children}
		</Box>
	</>
));

Page.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	meta: PropTypes.node,
};

export default Page;
