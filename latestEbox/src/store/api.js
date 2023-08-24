/**
 
 * @format
 */
/*-----Login Api-----*/

export const loginApi = "/login";

/*-----Operator Api-----*/
export const getOperatorAPI = "/v1/operators";
export const deleteOperatorAPI = "/v1/operators";
export const postOperatorAPI = "/v1/operators";
export const updateOperatorAPI = "/v1/operators";
export const viewOperatorAPI = "/v1/operators/viewoperator";
export const getServicesApi = "/v1/service/";


/*-----Product Prices Api-----*/
export const getProductPricesAPI = "/portalAPI";
export const deleteProductPricesAPI = "/portalDelete";
export const postProductAPI = "/portals";
export const viewPortalAPI = "/portalEdit";
export const postPortalSelectAPI = "/sunogee/changePortal"
export const updatePortalAPI = "/updatePortal";

/*-----Payment List-----*/
export const postPaymentListAPI = "/payment/list";
export const postPaymentCaptureDirect = "/v1/charges/card/capture-direct";
export const postPaymentInt = "/v1/service/checkout/init";
/*-----Payment Card Api-----*/

export const authorizeApi = "/v1/charges/card/authorize";
export const captureApi = "/v1/charges/card/capture";

/*-----payment history Api-----*/
export const getPaymentListAPI = "/payment/list";
export const getPaymentHistoryAPI = "/payment/list";
export const getPaymentHistoryDetailAPI = "/payment/details";

/*---- roles -----*/
export const getRolesAPI = "/sunogee/device_infos";
export const deleteRoleAPI = "/deviceDelete";
export const postStatusAPI = "/changeItemStatus";
export const postRoleAPI = "/v1/roles";
export const updateRoleAPI = "/v1/roles";
export const expiryNoteDateApi = "/sunogee/getNoteExpiry";
export const csvRoleAPI = "/v1/roles/downloadcsv";
export const expiryDateApi = "/sunogee/changeExpiry";
export const searhDateApi = "/search";
export const updateRoleModulesPermissionsAPI = "/v1/roles/update_module_perm";
export const postDeleteFileAPI = "/sunogee/contactDetailFile";



/*---- modules -----*/
export const getModulesAPI = "/v1/modules";
export const deleteModuleAPI = "/v1/modules";
export const postModuleAPI = "/v1/modules";
export const updateModuleAPI = "/v1/modules";
export const viewModuleAPI = "/v1/modules";
export const csvModuleAPI = "/v1/modules/downloadcsv?size=10&page=50";

/*---- permissions -----*/
export const getPermissionsAPI = "/v1/permissions";
export const deletePermissionAPI = "/v1/permissions";
export const postPermissionAPI = "/v1/permissions/registerPermission";
export const updatePermissionAPI = "/v1/permissions";
export const viewPermissionAPI = "/v1/permissions/viewper";

/*---- services -----*/
export const getServicesAPI = "/v1/service";
export const deleteServicesAPI = "/v1/service";
export const postServicesAPI = "/v1/service";
export const updateServicesAPI = "/v1/service";
export const viewServicesAPI = "/v1/service/viewservice";
export const csvServiceAPI = "/v1/service/downloadcsv?size=10&page=50";

/**
 
 * @format
 */
/*-----Login Api-----*/

// export const loginApi = "/v1/auth/login";

// /*-----Payment Card Api-----*/

// export const authorizeApi = "/v1/charges/card/authorize";
// export const captureApi = "/v1/charges/card/capture";

// /*-----Operator Api-----*/
// export const getOperatorAPI = ":8084/v1/operators";
// export const deleteOperatorAPI = ":8084/v1/operators";
// export const postOperatorAPI = ":8084/v1/operators";
// export const updateOperatorAPI = ":8084/v1/operators";
// export const viewOperatorAPI = ":8084/v1/operators/viewoperator";
// export const csvOperatorAPI = ":8084/v1/operators/downloadcsv?size=10&page=50";
// export const getServicesAPI = ":8082/v1/service/";

// /*-----Product Prices Api-----*/
// export const getProductPricesAPI = ":8083/v1/products";
// export const deleteProductPricesAPI = ":8083/v1/Products";
// export const getProductsAPI = ":8083/v1/products/";
// export const postProductAPI = ":8083/v1/Products";
// export const postMetaProductAPI = ":8083/v1/productmetadata";
// export const postProductPriceAPI = ":8083/v1/Products/price";
// export const viewProductAPI = ":8083/v1/Products/viewProduct";
// export const viewProductPriceAPI = ":8083/v1/Products/price/id";
// export const viewProductPriceByProductAPI = ":8083/v1/Products/price/byproduct";
// export const csvProductAPI = ":8083/v1/Products/downloadcsv?size=10&page=50";
// export const updateProductAPI = ":8083/v1/Products";

// /*-----Customer Api-----*/
// export const getCustomersAPI = ":8082/v1/customers/";
// export const deleteCustomerAPI = ":8082/v1/customers/";
// export const postCustomerAPI = ":8082/v1/customers/";
// export const editCustomerAPI = ":8082/v1/customers/viewcust/";
// export const updateCustomerAPI = ":8082/v1/customers/";
// export const csvCustomerAPI = ":8082/v1/customers/downloadcsv?size=10&page=50";

// /*-----subscription Api-----*/
// export const getSubscriptionAPI = ":8081/v1/subscriptions";
// export const deleteSubscriptionAPI = ":8081/v1/subscriptions";
// export const postSubscriptionAPI = ":8081/v1/subscriptions/";
// export const updateSubscriptionAPI = ":8081/v1/subscriptions";
// export const viewSubscriptionAPI = ":8081/v1/subscriptions/viewsub";
// export const csvSubscriptionAPI = ":8081/v1/subscriptions/downloadcsv?size=10&page=50";

// /*-----Payment List-----*/
// export const postPaymentListAPI = ":8086/payment/list";
// export const getPaymentListAPI = ":8086/payment/list";

// /*-----payment history Api-----*/
// export const getPaymentHistoryAPI = ":8086/payment/list";
// export const getPaymentHistoryDetailAPI = ":8086/payment/details";

// /*---- roles -----*/
// export const getRolesAPI = ":8085/v1/roles";
// export const deleteRoleAPI = ":8085/v1/roles";
// export const postRoleAPI = ":8085/v1/roles";
// export const updateRoleAPI = ":8085/v1/roles";
// export const viewRoleAPI = ":8085/v1/roles/viewrole";
//export const csvRoleAPI = ":8085/v1/roles/downloadcsv"
// export const updateRoleModulesPermissionsAPI = ":8085/v1/roles/update_module_perm";

// /*---- modules -----*/
// export const getModulesAPI = ":8085/v1/modules";
// export const deleteModuleAPI = ":8085/v1/modules";
// export const postModuleAPI = ":8085/v1/modules";
// export const updateModuleAPI = ":8085/v1/modules";
// export const viewModuleAPI = ":8085/v1/modules";

// /*---- permissions -----*/
// export const getPermissionsAPI = ":8085/v1/permissions";
// export const deletePermissionAPI = ":8085/v1/permissions";
// export const postPermissionAPI = ":8085/v1/permissions/registerPermission";
// export const updatePermissionAPI = ":8085/v1/permissions";
// export const viewPermissionAPI = ":8085/v1/permissions/viewper";

// /*-----Service List-----*/

// export const getServicesAPI = ":8082/v1/service"
// export const deleteServicesAPI = ":8082/v1/service"
// export const postServicesAPI = ":8082/v1/service"
// export const updateServicesAPI = ":8082/v1/service"
// export const viewServicesAPI = ":8082/v1/service/viewservice"
// export const csvServiceAPI = ":8082/v1/service/downloadcsv?size=10&page=50";
