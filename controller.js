import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './js/model.js';
import recipeView from './js/views/recipeView.js';
import searchView from './js/views/searchView.js';
import resultView from './js/views/resultView.js';
import paginationView from './js/views/paginationView.js';
import bookmarkView from './js/views/bookmarkView.js';
import addRecipeView from './js/views/addRecipeView.js';

if (module.hot) {
    module.hot.accept();
}

recipeView.addHandlerRender(renderRecipeFromID);
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
bookmarkView.addHandlerBookmark(controlBookmarks);
recipeView.addHandlerUpdateServings(controlServings);
addRecipeView.addHandlerWindow();
addRecipeView.addHandlerUpload(controlAddRecipe);

async function controlRecipe(id) {
    try {
        recipeView.renderSpinner();

        await model.loadRecipe(id);

        recipeView.render(model.state.recipe);

        bookmarkView.addHandlerBookmarkButton(controlBookmarkRecipes);
    } catch (error) {
        recipeView.renderError();
    }
}

function renderRecipeFromID(event) {
    const div = event.target.closest(".recipeDiv");
    const id = div.id;

    controlRecipe(id);
}

async function controlSearchResults() {
    try {
        resultView.renderSpinner();

        const query = searchView.getQuery();

        if (!query) {
            return;
        }

        await model.loadSearchResults(query);

        maintainPagination();
    } catch(err) {
        console.log(err);
    }
}

function controlPagination(button) {
    const pageNum = Number(button.dataset.goto);

    maintainPagination(pageNum);
}

function maintainPagination(pageNum = 1) {
    resultView.render(model.getSearchResultsPage(pageNum));

    recipeView.addHandlerRender(renderRecipeFromID);

    resultView.renderPaginationDiv();

    paginationView.render(model.state.search);
    paginationView.addHandlerClick(controlPagination);
}

function controlServings(newServings) {
    model.updateServings(newServings);

    recipeView.update(model.state.recipe);
}

function controlBookmarks() {
    bookmarkView.render(model.state.bookmarks);

    recipeView.addHandlerRender(renderRecipeFromID);
}

function controlBookmarkRecipes(button) {
    const recipeId = button.closest(".extraInfo").id;

    model.manageBookmark(recipeId);

    button.classList.toggle('bookmarked');
}

async function controlAddRecipe(newRecipe) {
    try {
        console.log(newRecipe);

        await model.uploadRecipe(newRecipe);
    } catch(err) {
        console.log(err + "☠️☠️☠️☠️")
        addRecipeView.renderError(err.message);
    }
}

function newFeature() {
    console.log("Welcome to the application");
}

newFeature();