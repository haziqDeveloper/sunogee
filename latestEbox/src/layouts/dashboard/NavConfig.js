/** @format */

// component
import Iconify from "../../components/Iconify";
import Homeimg from "../../assets/images/home.svg";
import Productimg from "../../assets/images/products.svg";
import Rollimg from "../../assets/images/roll.svg";


// ----------------------------------------------------------------------

const getIcon = (name) => <img src={name} alt="a" />;

const navConfig = [
	{
		title: "Device Info",
		icon: getIcon(Rollimg),
		children: [
			{
				title: "Device Info",
				path: "/device-info",
			},
		],
	},
	{
		title: "Portal",
		icon: getIcon(Productimg),
		children: [
			{
				title: "Portal",
				path: "/portal-list",
			},
		],
	},
	{
		title: "Domain Url",
		icon: getIcon(Productimg),
		children: [
			{
				title: "Domain Url",
				path: "/domain_url",
			},
		],
	},
	{
		title: "Contact Detail",
		icon: getIcon(Productimg),
		children: [
			{
				title: "Contact Detail",
				path: "/contact_detail",
			},
		],
	},
	{
		title: "Update Version",
		icon: getIcon(Productimg),
		children: [
			{
				title: "Update Version",
				path: "/update_version",
			},
		],
	},
];

export default navConfig;
