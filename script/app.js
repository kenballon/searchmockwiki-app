import { setSearchFocus } from "./searchBar.js";
import {
    deleteSearchResults,
    buildSearchResults,
    clearStatsLine,
    setStatsline,
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (e) => {
    if (e.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    console.log("%c App is loaded....", "color:green;");

    //set focus
    setSearchFocus();

    //TODO: 3 listeners clear text

    const form = document.getElementById("searchbar");
    form.addEventListener("onsubmit", submitTheSearch);
};

// procedural "workflow" function
const submitTheSearch = (e) => {
    console.log('checking...');
    e.preventDefault();
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
};

const processTheSearch = async() => {
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) buildSearchResults(resultArray);

    setStatsline(resultArray.length);
};