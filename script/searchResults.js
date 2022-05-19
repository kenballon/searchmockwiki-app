export const deleteSearchResults = () => {
  const parentElement = document.getElementById("search-results");
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildSearchResults = (resArray) => {
    const resultsContainer = document.querySelector('.results-container');
    let returnedData = ''

  resArray.map((res) => {
    console.log(res);
    returnedData += `
    <a href="https://en.wikipedia.org/?curid=${res.id}" class="link-search-res-block d-flex gap-1 my-4" target="_blank">
        <img src="${res.img || null}" alt="" width="100" height="100" class="res-img-thumbnail b-radius-5">
        <article class="text-results-wrapper">
            <h4 class="header-title">${res.title}</h4>
            <p class="except-text-res">${res.snippet}</p>
        </article>
    </a>
    `;

    return returnedData;
  });

  resultsContainer.insertAdjacentHTML('beforeend', returnedData)
};


export const clearStatsLine = () => {
  document.getElementById("stats-results").textContent = "";
};

export const setStatsline = (numOfResults) => {
  const statsLine = document.getElementById("stats-results");
  if (numOfResults) {
    statsLine.textContent = `Displaying ${numOfResults} results.`;
  } else {
    statsLine.textContent = "Sorry, no results";
  }
};
