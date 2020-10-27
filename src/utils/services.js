import axios from "axios";

const POST_METHOD = process.env.NODE_ENV === "production" ? "post" : "get";

const makeRequest = async (url, method, payload) => {
  const paramCls = method === "get" ? "params" : "data";

  const { data, status } = await axios({
    url,
    method,
    [paramCls]: payload,
  });

  if (!data) {
    // check responseCode
    throw new Error('error');
  }

  return {
    status,
    data,
  };
};

const get = function (url, params, headers = {}) {
  return makeRequest(url, "get", params, headers);
};

const post = function (url, params, headers = {}) {
  return makeRequest(url, POST_METHOD, params, headers);
};

export { get, post };
