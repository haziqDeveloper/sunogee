/** @format */

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Drawer } from "@mui/material";
// mock
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
//
import navConfig from "./NavConfig";

import Eboxlogo from "../../assets/images/Ebox.png";
import DoubleArrowImg from "../../assets/images/doublearrow.svg";

// ----------------------------------------------------------------------

// const [width, setWidth] = useState(280);

const DRAWER_WIDTH = 280;
const Closebar = () => {
	console.log("hello");
	DRAWER_WIDTH = 80;
};
const RootStyle = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("lg")]: {
		flexShrink: 0,
		width: DRAWER_WIDTH,
	},
}));

const AccountStyle = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
	const { pathname } = useLocation();

	console.log("isOpenSidebar",isOpenSidebar);

	const isDesktop = useResponsive("up", "lg");

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);



	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				"& .simplebar-content": {
					height: 1,
					display: "flex",
					flexDirection: "column",
				},
			}}>
			<Box sx={{ px: 2.5, py: 3, display: "inline-flex" }} className="logo sideLogo">
				<div className="Logodiv">
					<img src={Eboxlogo} alt="Logo" />
				</div>
				<img
					src={DoubleArrowImg}
					alt="Double Arrow"
					className="Darrow"
					onClick={Closebar}
				/>
			</Box>

			<NavSection navConfig={navConfig} className="sidemenu" />
		</Scrollbar>
	);

	return (
		<RootStyle>
			{!isDesktop && (
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH },
					}}>
					{renderContent}
				</Drawer>
			)}

			{isDesktop && (
				<Drawer
					className="Sidebarbg"
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
						},
					}}>
					{renderContent}
				</Drawer>
			)}
		</RootStyle>
	);
}
