/** @format */

import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
	Box,
	Divider,
	Typography,
	Stack,
	MenuItem,
	IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
// mocks_
import account from "../../_mock/account";
import ProfileImg from "../../assets/images/person-icon.svg";
import Cookies from "js-cookie";
import { logout } from "src/store/slices/auth";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: "プロフィール",
		icon: "eva:home-fill",
		linkTo: "/",
	},
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
	const dispatch = useDispatch();

	const anchorRef = useRef(null);

	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () =>
	{
		setOpen(null);
	}

	const handleClose = () => {
		Cookies.remove("token");
		dispatch(logout);
		localStorage.removeItem("user");
		window.location = "/";
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							position: "absolute",
						},
					}),
				}}>
				<img src={ProfileImg} alt="photoURL" />
			</IconButton>

			<MenuPopover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleCloseMenu}
				sx={{
					p: 0,
					mt: 1.5,
					ml: 0.75,
					"& .MuiMenuItem-root": {
						typography: "body2",
						borderRadius: 0.75,
					},
				}}>
				<Divider sx={{ borderStyle: "dashed" }} />



				<MenuItem onClick={handleClose} sx={{ m: 1 }} className="MenuItem">
					<b>Logout</b>
				</MenuItem>
			</MenuPopover>
		</>
	);
}
