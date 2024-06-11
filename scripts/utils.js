const PRODUCTS_API = "https://catalogapi.co/products";

const CATEGORIES_URL = "https://catalogapi.co/categories";

const capitalizeFirstChar = (str) => {
  return str
    .split(" ")
    .map((char) => {
      return char.charAt(0).toUpperCase() + char.slice(1);
    })
    .join(" ");
};

const debounce = (callback, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const filterSimilarWords = (arr, key, value) => {
  return arr.filter((el) =>
    el[key]?.toLowerCase()?.includes(value.toLowerCase())
  );
};

/**
 *
 * @param  paramsObject
 * eg:
 * {
 *  "limit": number,
 *  "category" : string,
 *  "q": string
 * }
 */
const fetchProducts = async (paramsObject) => {
  let url = PRODUCTS_API;
  let queryParams = "";
  for (const key in paramsObject) {
    queryParams += `${encodeURIComponent(key)}=${encodeURIComponent(
      paramsObject[key]
    )}&`;
  }
  // Remove trailing '&' if exists
  if (queryParams.length > 0) {
    queryParams = queryParams.slice(0, -1);
  }

  const urlWithParams = url + (queryParams ? `?${queryParams}` : "");

  const response = await fetch(urlWithParams);
  return await response.json();
};

const fetchCategories = async () => {
  const response = await fetch(CATEGORIES_URL);
  return await response.json();
};
