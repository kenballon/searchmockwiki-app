export const deleteSearchResults = () => {
    const parentElement = document.getElementById('search-results');
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
}

export const buildSearchResults = async(resArray) => {
    resArray.forEach(res => {
        const resultItem = createResulttem(res);
        const resultContents = document.createElement('div');
        resultContents.classList.add('result-contents');
        if (resultContents.img) {
            const resultImage = createResultImage(res);
            resultContents.append(resultImage);
        }
        const resultText = createResultText(res);
        resultContents.append(resultText);
        resultItem.append(resultContents);
        const searchResults = document.getElementById('search-results'); // TODO: check this id if it exist in the DOM
        searchResults.append(resultItem);
    });
}

// helper functions 
const createResulttem = result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    const resultTitle = document.createElement('div');
    resultTitle.classList.add('result-title-heading');
    const link = createElement('a');
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
}

const createResultImage = (result) => {
    const resultImage = document.createElement('div');
    resultImage.classList.add('result-image');
    const img = document.createElement('img');
    img.src = result.img;
    img.alt = result.title;
    resultImage.append(img);

    return resultImage;
}

const createResultText = (result) => {
    const resultText = document.createElement('div');
    resultText.classList.add('result-text');
    const resultDesc = document.createElement('p');
    resultDesc.classList.add('result-desc');
    resultDesc.textContent = result.text;
    resultText.append(resultDesc);

    return resultText;
}

export const clearStatsLine = () => {
    document.getElementById('stats-results').textContent = '';
}

export const setStatsline = (numOfResults) => {
    const statsLine = document.getElementById('stats-results');
    if (numOfResults) {
        statsLine.textContent = `Displaying ${numOfResults} results.`;
    } else {
        statsLine.textContent = 'Sorry, no results';
    }
}