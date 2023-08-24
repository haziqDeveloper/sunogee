/** @format */

import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Auth/Login";

// Role CRUD
import AddEditRole from "./pages/Role_Management/AddEditRole";
import RoleList from "./pages/Role_Management/RoleList";
import ProductPriceList from "./pages/Product_Price_Management/ProductPriceList";
import AddEditProduct from "./pages/Product_Price_Management/AddEditProduct";
import DOMAINURL from "./pages/DomainUrl";
import CONTACTDETAIL from "./pages/ContactDetail";
import UPDATEVERSION from "./pages/UpdateVersion";
import NotFound from "./pages/Page404";
import Protected from "./components/Protected";


// ----------------------------------------------------------------------

export default function Router() {
	return useRoutes([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/",
			element: <Protected Component={Login} />,
		},
		{
			path: "/",
			element: <DashboardLayout />,
			children: [
				{ path: "device-info", element: <Protected Component={RoleList} /> },
				{
					path: "add-role-list",
					element: <Protected Component={AddEditRole} />,
				},
				{
					path: "device-info-note/:id",
					element: <Protected Component={AddEditRole} />,
				},
				{
					path: "portal-list",
					element: <Protected Component={ProductPriceList} />,
				},
				{
					path: "add-portal",
					element: <Protected Component={AddEditProduct} />,
				},
				{
					path: "edit-portal/:id",
					element: <Protected Component={AddEditProduct} />,
				},
				{
					path: "domain_url",
					element: <Protected Component={DOMAINURL} />,
				},
				{
					path: "contact_detail",
					element: <Protected Component={CONTACTDETAIL} />,
				},
				{
					path: "update_version",
					element: <Protected Component={UPDATEVERSION} />,
				},
				
			],
		},
		{
			path: "/",
			element: <LogoOnlyLayout />,
			children: [
				{ path: "login", element: <Login /> },
				{ path: "404", element: <NotFound /> },
			],
		},
		{ path: "*", element: <Navigate to="/404" replace /> },
	]);
}
