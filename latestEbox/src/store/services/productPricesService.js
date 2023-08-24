import { getProductPricesAPI, deleteProductPricesAPI,postPortalSelectAPI,postStatusAPI, postProductAPI, updatePortalAPI, viewPortalAPI } from "../api";
import Instance from "../axois";

const API_URL = process.env.REACT_APP_API;

const getProductPrices = async ({page = 1}) => {
    try {
        const response = await Instance.get(API_URL + getProductPricesAPI, { params:{page}});
        return response.data;
    } catch (error) {
        // console.log("New Test", error);
    }
}

const deleteProductPrices = async (prdId) => {
    try {
        const response = await Instance.get(API_URL + deleteProductPricesAPI + "/" + prdId);
        return response;
    } catch (error) {
        console.log("Delete", error);
    }
}

const postProduct = async (data) => {
    try {
        const response = await Instance.post(API_URL + postProductAPI , data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postSelectPortal = async (data) => {
    try {
        const response = await Instance.post(API_URL + postPortalSelectAPI, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postStatus = async (data,sId) => {
	try {
		const response = await Instance.post(API_URL + postStatusAPI + "/" + sId, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};


const viewPortal = async (prodId) => {
    try {
        const response  = await Instance.get(API_URL + viewPortalAPI + "/" + prodId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const updatePortal = async (prdId , data) => {
    try {
        let response = await Instance.put(API_URL + updatePortalAPI + "/" + prdId,data);
        return response;
    } catch (error) {
        throw error;
    }
};


export {getProductPrices, deleteProductPrices,postSelectPortal, postProduct, updatePortal, viewPortal,postStatus};