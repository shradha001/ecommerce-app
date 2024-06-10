const getCategories = async () => {
  let categories = await fetchCategories();
  categories = categories?.data ?? [];
  return categories;
};

const moveSelectedCategoryToAll = (toAll = false) => {
  const selectedCategoryEl = document.getElementsByClassName(
    "sub-category-img-selected"
  )[0];
  if (selectedCategoryEl) {
    selectedCategoryEl.classList.remove("sub-category-img-selected");
  }
  if (toAll) {
    document
      .getElementById("category-img-0")
      .classList.add("sub-category-img-selected");
  }
};

const constructSubCategoryContainer = (data) => {
  const subContainerDiv = document.createElement("div");
  subContainerDiv.classList.add("sub-category-container");

  const { id, name, image } = data;

  // CATEGORY IMAGE ELEMENT
  const imgElement = document.createElement("img");
  imgElement.classList.add("sub-category-img");
  imgElement.setAttribute("id", "category-img-" + id);
  imgElement.setAttribute("src", image);

  if (id === 0) {
    imgElement.classList.add("sub-category-img-selected");
  }
  imgElement.addEventListener("click", () => {
    const selectedCategoryEl = document.getElementsByClassName(
      "sub-category-img-selected"
    )[0];
    if (selectedCategoryEl) {
      selectedCategoryEl.classList.remove("sub-category-img-selected");
    }
    imgElement.classList.add("sub-category-img-selected");
    loadCategories(id);
  });

  //CATEGORY TITLE
  const titleElement = document.createElement("p");
  titleElement.classList.add("category-title");
  titleElement.textContent = name;

  //ADD IMAGE AND TITLE TO CATEGORY SUB CONTAINER
  subContainerDiv.appendChild(imgElement);
  subContainerDiv.appendChild(titleElement);

  return subContainerDiv;
};

const appendSubCategoryToContainer = (categoryEl) => {
  const categoryParentEl = document.getElementById("categories-container");
  categoryParentEl.appendChild(categoryEl);
};

(async function () {
  const categories = await getCategories();
  categories.unshift({
    id: 0,
    name: "All Categories",
    image: "/assets/categories/0.jpg",
  });
  categories.map((category) => {
    const categoryEl = constructSubCategoryContainer(category);
    appendSubCategoryToContainer(categoryEl);
  });
})();
