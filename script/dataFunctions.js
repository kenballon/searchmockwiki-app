export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById('search').value.trim();
    const regEx = /[ ]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regEx, " ");
    return searchTerm;
}

export const retrieveSearchResults = async(searTerm) => {
    const wikiSearchString = getWikiSearchString(searTerm);
    const wikiSearchResults = await requestData(wikiSearchString);
    let resArray = [];

    if (wikiSearchResults.hasOwnProperty("query")) {
        resArray = processWikiResults(wikiSearchResults.query.pages);
    }
    return resArray;
}

const getWikiSearchString = (searchTerm) => {
    const maxChars = getMaxChars();

    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extract&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;

    const searchString = encodeURI(rawSearchString);
    return searchString;
}

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if (width < 414) maxChars = 65;
    if (width >= 414 && width < 1400) maxChars = 100;
    if (width >= 1400) maxChars = 130;

    return maxChars;
}

const requestData = async(searchString) => {
    try {
        const res = await fetch(searchString);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

const processWikiResults = (results) => {
    const resArray = [];

    Object.keys(results).forEach(key => {
        const id = key;
        const title = results[key].title;
        const text = results[key].extract;
        const img = results[key].hasOwnProperty('thumbnail') ? results[key].thumbnail.source : null;

        const item = {
            id: id,
            title: title,
            text: text,
            img: img
        }

        resArray.push(item);
    })

    return resArray;
}