const PRODUCTS_API = "https://fakestoreapi.com/products";
const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";

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
 * @param  queryParams
 * eg:
 * {
 *  "limit": number,
 *  "category" : string,
 * }
 */
const fetchProducts = async (queryParams) => {
  let url = PRODUCTS_API;
  if (queryParams?.category) {
    url += `/category/${queryParams.category}`;
  }
  if (queryParams?.limit) {
    url += `?limit=${queryParams.limit}`;
  }
  const response = await fetch(url);
  return await response.json();
};

const fetchCategories = async () => {
  const response = await fetch(CATEGORIES_URL);
  return await response.json();
};
