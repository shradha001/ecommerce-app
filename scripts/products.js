const defaultLimit = 5;

var pageNumber = 1;
var category = null;
var showLoader = false;
var requestedLimit = 5;

const showLoaderDiv = () => {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "block";
  hideNoProductsText();
  hideLoadMoreButton();
};

const hideLoaderDiv = () => {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "none";
};

const getAllProducts = async () => {
  const limit = pageNumber * defaultLimit;
  requestedLimit = limit;
  showLoaderDiv();
  return fetchProducts({ limit, category });
};

const constructProductCard = (data) => {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");

  //PRODUCT IMAGE
  const imgContainer = document.createElement("img");
  imgContainer.setAttribute("src", data?.image);
  imgContainer.classList.add("product-img");

  //PRODUCT METADATA CONTAINER
  const metadataContainer = document.createElement("div");
  metadataContainer.classList.add("product-metadata-container");

  //PRODUCT TITLE
  const titleEl = document.createElement("p");
  titleEl.classList.add("product-title");
  titleEl.textContent = data?.title;

  //PRODUCT PRICE
  const priceEl = document.createElement("p");
  priceEl.classList.add("product-price");
  priceEl.textContent = `$${data?.price}`;

  //PRODUCT RATINGS
  const productRating = data?.rating?.rate;
  const ratingsContainer = document.createElement("div");
  ratingsContainer.classList.add("product-ratings-container");
  if (productRating) {
    //STAR - FILLED & UNFILLED
    for (let i = 0; i < 5; i++) {
      let ratingsEl = document.createElement("span");
      ratingsEl.innerHTML = "&#9733";
      let className = "unfilled-star";

      if (i < parseInt(productRating, 10)) {
        className = "filled-star";
      }

      ratingsEl.classList.add(className);

      ratingsContainer.appendChild(ratingsEl);
    }
  }
  //APPEND IMAGE TO PRODUCT CONTAINER
  productContainer.appendChild(imgContainer);

  //APPEND TITLE PRICE AND RATINGS TO METADATA CONTAINER
  metadataContainer.appendChild(titleEl);
  metadataContainer.appendChild(priceEl);
  if (productRating) {
    metadataContainer.appendChild(ratingsContainer);
  }

  //APPEND METADATA TO PRODUCT CONTAINER
  productContainer.appendChild(metadataContainer);

  //APPEND PRODUCT TO PRODUCTS CONTAINER
  const productsContainer = document.getElementById("products-sub-container");
  productsContainer.appendChild(productContainer);
};

const loadMore = () => {
  loadProducts();
};

const hideLoadMoreButton = () => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  loadMoreBtn.style.display = "none";
};

const showLoadMoreButton = () => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  loadMoreBtn.style.display = "block";
};

const hideNoProductsText = () => {
  const noProductsTextEl = document.getElementById("no-products-text");
  noProductsTextEl.style.display = "none";
};

const showNoProductsText = () => {
  const noProductsTextEl = document.getElementById("no-products-text");
  noProductsTextEl.style.display = "block";
};

const loadProducts = async () => {
  const response = await getAllProducts();
  let startIndex = pageNumber === 1 ? 0 : (pageNumber - 1) * defaultLimit;
  const slicedCategories = response.slice(startIndex);
  slicedCategories.map((product) => constructProductCard(product));

  hideLoaderDiv();

  // Hide the "Load More" button if the response contains fewer items than the limit
  if (response.length < requestedLimit) {
    hideLoadMoreButton();
    showNoProductsText();
  } else {
    pageNumber += 1;
    hideNoProductsText();
    showLoadMoreButton();
  }
};

const emptyProductsContainer = () => {
  const productsContainer = document.getElementById("products-sub-container");
  productsContainer.innerHTML = "";
};

const loadCategories = (categoryId) => {
  emptyProductsContainer();
  pageNumber = 1;
  category = categoryId;
  loadProducts();
};

const loadSpecificProduct = (product) => {
  emptyProductsContainer();
  clearPageCategoryToDefault();
  constructProductCard(product);
  hideLoadMoreButton();
  showNoProductsText();
};

const loadProductsBySearchKeyword = (q) => {
  emptyProductsContainer();
  clearPageCategoryToDefault();
  loadProducts(q);
};

const clearPageCategoryToDefault = (allCategorySelection = false) => {
  pageNumber = 1;
  category = null;
  moveSelectedCategoryToAll(allCategorySelection);
};
