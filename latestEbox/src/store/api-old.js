/**
 
 * @format
 */
/*-----Login Api-----*/

export const loginApi = ":8085/v1/auth/login";

/*-----Payment Card Api-----*/

export const authorizeApi = ":8086/v1/charges/card/authorize";
export const captureApi = ":8086/v1/charges/card/capture";

/*-----Operator Api-----*/
export const getOperatorAPI = ":8084/v1/operators";
export const deleteOperatorAPI = ":8084/v1/operators";
export const postOperatorAPI = ":8084/v1/operators";
export const updateOperatorAPI = ":8084/v1/operators";
export const viewOperatorAPI = ":8084/v1/operators/viewoperator";
export const getServicesApi = ":8082/v1/service/";
export const getRolesApi = ":8085/v1/roles";

/*-----Product Prices Api-----*/
export const getProductPricesAPI = ":8083/v1/Products";
export const deleteProductPricesAPI = ":8083/v1/Products";
export const getProductsAPI = ":8083/v1/Products/";
export const postProductAPI = ":8083/v1/Products";
export const postMetaProductAPI = ":8083/v1/productmetadata";
export const postPriceProductAPI = ":8083/v1/Products/price";
export const viewProductAPI = ":8083/v1/Products/viewProduct";
export const viewProductPriceAPI = ":8083/v1/Products/price/id";
export const viewProductPriceByProductAPI = ":8083/v1/Products/price/byproduct";
export const updateProductAPI = ":8083/v1/Products";

/*-----Customer Api-----*/
export const getCustomersAPI = ":8082/v1/customers/";
export const deleteCustomerAPI = ":8082/v1/customers/";
export const postCustomerAPI = ":8082/v1/customers/";
export const editCustomerAPI = ":8082/v1/customers/viewcust/";
export const updateCustomerAPI = ":8082/v1/customers/";

/*-----subscription Api-----*/
export const getSubscriptionAPI = ":8081/v1/subscriptions";
export const deleteSubscriptionAPI = ":8081/v1/subscriptions";
export const postSubscriptionAPI = ":8081/v1/subscriptions/";
export const updateSubscriptionAPI = ":8081/v1/subscriptions";
export const viewSubscriptionAPI = ":8081/v1/subscriptions/viewsub";

/*-----Payment List-----*/
export const postPaymentListAPI = ":8086/payment/list";

/*-----payment history Api-----*/
export const getPaymentHistoryAPI = ":8086/payment/list";
export const getPaymentHistoryDetailAPI = ":8086/payment/details";
