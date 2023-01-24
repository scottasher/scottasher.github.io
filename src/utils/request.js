import axios from "axios";
import { getToken } from "./authority";
import def from "../config/defaultSettings";

async function request(url, option) {
  const ROOT = (option && option.baseURL) || def.ROOT_URL;
  const options = {
    baseURL: ROOT,
    ...option,
  };

  const headers = {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  };

  const newOptions = {
    ...options,
    ...headers,
  };

  const res = await axios(url, newOptions);
  return res;
}

export default request;

export function renderQueries(obj) {
  if (!obj) return "";
  const queryKeys = Object.keys(obj);

  const res = queryKeys.map((key) => {
    return `${key}=${obj[key]}`;
  });

  return "?" + res.join("&");
}
