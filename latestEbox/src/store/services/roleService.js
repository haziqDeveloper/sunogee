/** @format */

import {
	getRolesAPI,
	deleteRoleAPI,
	postRoleAPI,
	updateRoleAPI,
	getModulesAPI,
	expiryNoteDateApi,
	getPermissionsAPI,
	expiryDateApi,
	loginApi,
	searhDateApi,
	postDeleteFileAPI,
	csvRoleAPI,
	updateRoleModulesPermissionsAPI,
} from "../api";
import Instance from "../axois";

const API_URL = process.env.REACT_APP_API;

const getRoles = async (params = { page:0 }) => {
	try {
		const response = await Instance.get(API_URL + getRolesAPI, { params });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getCSVRoles = async ({ size = 10, page = 50 }) => {
	try {
		const response = await Instance.get(API_URL + csvRoleAPI, {params: { size, page }});
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getModules = async ({ size = 0, page = 0 }) => {
	try {
		const response = await Instance.get(API_URL + getModulesAPI, { size, page });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getPermissions = async ({ size = 0, page = 0 }) => {
	try {
		const response = await Instance.get(API_URL + getPermissionsAPI, { size, page });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const postLoginAuth = async (data) => {
	try {
		  const response = await Instance.post(API_URL + loginApi , data);
		  return response.data;
	  } catch (error) {
		  throw error;
	  }
  };

  const postDate = async (id,data) => {
	try {
		  const response = await Instance.put(API_URL + expiryDateApi +"/"+ id, data);
		  return response.data;
	  } catch (error) {
		  throw error;
	  }
  };

  const viewNoteDate = async (id) => {
	try {
		  const response = await Instance.get(API_URL + expiryNoteDateApi +"/"+ id);
		  return response.data;
	  } catch (error) {
		  throw error;
	  }
  };

const postRole = async (data) => {
	try {
		const response = await Instance.post(API_URL + postRoleAPI, data);
		return response;
	} catch (error) {
		throw error;
	}
};

const deleteFile = async (id,data) => {
	try {
		const response = await Instance.post(API_URL + postDeleteFileAPI +"/"+ id, data);
		return response;
	} catch (error) {
		throw error;
	}
};

const getSearchFilter = async (data) => {
	try {
		const response = await Instance.get(API_URL + searhDateApi + "/" + data);
		return response;
	} catch (error) {
		throw error;
	}
};

const updateRole = async (roleId, data) => {
	try {
		let response = await Instance.patch(API_URL + updateRoleAPI, data, {
			params: { roleId },
		});
		return response;
	} catch (error) {
		throw error;
	}
};

const updateRoleModulesPermissions = async (data) => {
	try {
		let response = await Instance.post(API_URL + updateRoleModulesPermissionsAPI, data, {
			// params: { roleId },
		});
		return response;
	} catch (error) {
		throw error;
	}
};


const deleteRole = async (id) => {
	try {
		const response = await Instance.get(API_URL + deleteRoleAPI + "/" + id);
		return response;
	} catch (error) {
		throw error;
	}
};



export {
	deleteRole,
	postRole,
	updateRole,
	getRoles,
	getCSVRoles,
	getSearchFilter,
	getModules,
	postLoginAuth,
	getPermissions,
	postDate,
	viewNoteDate,
	deleteFile,
	updateRoleModulesPermissions
};
