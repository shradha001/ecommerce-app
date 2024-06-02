var searchQuery = "";

const constructSearchList = (items) => {
  const unorderedListElement = document.getElementById("search-list");
  items.map((el) => {
    const liEl = document.createElement("li");
    liEl.classList.add("search-list-item");
    liEl.textContent = el.title;
    liEl.addEventListener("click", () => {
      emptySearchValue();
      emptySearchList();
      loadSpecificProduct(el);
    });
    unorderedListElement.appendChild(liEl);
  });
};

const emptySearchList = () => {
  document.getElementById("search-list").innerHTML = "";
};

const emptySearchValue = () => {
  searchQuery = "";
  document.getElementById("search-input-box").value = "";
};

const getProductNameBySearchKeyword = async (keyword) => {
  emptySearchList();
  clearPageCategoryToDefault();
  const products = await fetchProducts("limit: 20");
  if (searchQuery && products && products.length > 0) {
    const filteredWords = filterSimilarWords(products, "title", keyword);
    constructSearchList(filteredWords);
  }
};

const onSearch = (keyword) => {
  if (keyword) {
    getProductNameBySearchKeyword(keyword);
  }
};

const debouncedSearchCallback = debounce(onSearch, 500);

const searchEl = document.getElementById("search-input-box");

searchEl.addEventListener("input", (e) => {
  const keyword = e.target.value;
  searchQuery = keyword;
  if (keyword === "") {
    emptySearchList();
  } else if (e.key !== "Enter") {
    //not handling enter key press yet
    debouncedSearchCallback(keyword);
  }
});
