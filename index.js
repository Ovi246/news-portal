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
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
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

const displayNews = (newsData) => {
  const newsContainer = document.getElementById("news");
  newsContainer.textContent = "";
  const loader = document.getElementById("loader");

  for (news of newsData) {
    let date = new Date(news.author.published_date);
    let dateList = date.toUTCString().split(" ");
    let newDate = `${dateList[1]} ${dateList[2]}, ${dateList[3]}`;
    const newsCard = document.createElement("div");
    newsCard.innerHTML = `
      <div
      class="w-full h-[340px] rounded-lg bg-white p-5 flex flex-row items-center"
      >
        <img
          src="${
            news.thumbnail_url === null ? "unavailable" : news.thumbnail_url
          }"
          alt=""
          class="w-[244px] h-[300px] mr-10 rounded-md"
        />
        <div class="flex flex-col gap-10 w-full">
          <h2 class="text-2xl font-bold">
            ${news.title === null ? "unavailable" : news.title}
          </h2>
          <p class="text-lg font-normal text-gray-400 line-clamp-4">
            ${news.details === null ? "unavailable" : news.details}
          </p>
          <div class="flex justify-between items-center">
            <div class="flex flex-row justify-center items-center">
              <img src="${
                news.author.img === null ? "unavailable" : news.author.img
              }" alt="" class="w-[40px] h-[40px] mr-2" />
              <div class="flex flex-col">
                <span>${
                  news.author?.name === null || news.author.name.length === 0
                    ? "unavailable"
                    : news.author.name
                }</span>
                <span>${newDate}</span>
              </div>
            </div>
            <i class="fa-regular fa-eye"> ${
              news.total_view === null ? "unavailable" : news.total_view
            }</i>
            <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <button onClick="newsDetails('${news._id}')" data-bs-toggle="modal"
            data-bs-target="#exampleModalCenteredScrollable" type="button"><i class="fa-solid fa-arrow-right text-purple-700 cursor-pointer"></i></button>
          </div>
        </div>
      </div>
    `;

    newsContainer.appendChild(newsCard);
    loader.classList.add("hidden");
  }
};

const newsDetails = async (newsId) => {
  let modalContainer = document.getElementById("modal-container");
  try {
    let res = await fetch(`${baseUrl}/${newsId}`);
    let data = await res.json();
    let newsData = data.data[0];
    modalContainer.innerHTML = `
    <div class="flex flex-col gap-10 w-full">
      <h2 class="text-2xl font-bold">
        ${newsData.title === null ? "unavailable" : newsData.title}
      </h2>
      <p class="text-lg font-normal text-gray-400 ">
        ${newsData.details === null ? "unavailable" : newsData.details}
      </p>
      <div class="flex justify-between items-center">
        <div class="flex flex-row justify-center items-center">
          <img src="${
            newsData.author.img === null ? "unavailable" : newsData.author.img
          }" alt="" class="w-[40px] h-[40px] mr-2" />
          <div class="flex flex-col">
            <span>${
              newsData.author?.name === null ||
              newsData.author.name.length === 0
                ? "unavailable"
                : newsData.author.name
            }</span>
            <span>${newsData.author.published_date}</span>
          </div>
        </div>
        <i class="fa-regular fa-eye"> ${
          newsData.total_view === null ? "unavailable" : newsData.total_view
        }</i>
    </div>
  `;
  } catch (error) {
    console.log(error);
  }
};
