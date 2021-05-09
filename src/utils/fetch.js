import axios from "axios";
const API_DOMAIN =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_API_DOMAIN_PROD
    : process.env.REACT_APP_API_DOMAIN_DEV;

axios.interceptors.request.use(
  function (request) {
    request["url"] = API_DOMAIN + request["url"];
    request.headers["Authorization"] = sessionStorage.getItem("token") || "";
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response.status === 401); // login failure go to login page
    // window.location = "/";
    return Promise.reject(error);
  }
);

const get = async (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then((response) => {
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteApi = async (url) => {
  return new Promise((resolve, reject) => {
    try {
      axios.delete(url).then((response) => {
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const post = async (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, {
          ...params,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const patch = async (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .patch(url, {
          ...params,
        })
        .then((response) => {
          resolve(response);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getData = async (url) => {
  try {
    const response = await get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await deleteApi(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postData = async (url, params) => {
  try {
    const response = await post(url, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (url, params) => {
  try {
    const response = await patch(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
};
