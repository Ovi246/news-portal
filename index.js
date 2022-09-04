// base api link
const baseUrl = "https://openapi.programming-hero.com/api/news";

fetch(`${baseUrl}/categories`)
  .then((res) => res.json())
  .then((data) => {
    displayCategories(data.data.news_category);
  })
  .catch((error) => {
    console.log(error);
  });

const displayCategories = (categories) => {
  const categories_ul = document.getElementById("categories");
  for (category of categories) {
    let categoryId = category.category_id;
    let categoryName = category.category_name;
    const categoryDiv = document.createElement("li");
    categoryDiv.innerHTML = `<li class="text-xl mr-7 text-gray-400 cursor-pointer" onClick="getCategoryNews('${categoryId}','${categoryName}')">${category.category_name}</li>`;

    categories_ul.appendChild(categoryDiv);
  }
};

const getCategoryNews = (categoryId, categoryName) => {
  const categoryInfo = document.getElementById("categoryInfo");
  fetch(`${baseUrl}/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      let categoryNewsData = data.data;
      displayNews(categoryNewsData);
      categoryInfo.innerText = `${categoryNewsData.length} items found for category ${categoryName}`;
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayNews = (newsData) => {};
