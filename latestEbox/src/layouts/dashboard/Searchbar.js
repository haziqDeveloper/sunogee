/** @format */

import { useState } from "react";
// material
import { styled, alpha } from "@mui/material/styles";
import {
	Input,
	Slide,
	Button,
	IconButton,
	InputAdornment,
	ClickAwayListener,
} from "@mui/material";
// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
	top: 0,
	left: 0,
	zIndex: 99,
	width: "100%",
	display: "flex",
	position: "absolute",
	alignItems: "center",
	height: APPBAR_MOBILE,
	backdropFilter: "blur(6px)",
	WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
	padding: theme.spacing(0, 3),
	boxShadow: theme.customShadows.z8,
	backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
	[theme.breakpoints.up("md")]: {
		height: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

// ----------------------------------------------------------------------

const Searchbar = (props) => {
	return (
		<p className="headersearchtext" {...props}>
			{" "}
			{props.title}
		</p>
	);
};
export default Searchbar;
