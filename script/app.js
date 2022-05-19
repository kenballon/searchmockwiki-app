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
    console.log("%c App is loaded....", "background-color:green;");

    //set focus
    setSearchFocus();

    //TODO: 3 listeners clear text

    const form = document.getElementById("searchbar");
    form.addEventListener("submit", submitTheSearch);
};

// procedural "workflow" function
const submitTheSearch = (e) => {    
    
    e.preventDefault();

    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
};

const processTheSearch = async() => {
    console.log('checking...');
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) buildSearchResults(resultArray);

    setStatsline(resultArray.length);
};