// Model part of the architecture is concerned with the API calls etc and sending the data back to the controller

// the state variable keeps track of the various major properties of the project
import { API_URL, RES_PER_PAGE, KEY } from "./config";
import { getJSON, sendJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
}

// The loadRecipe function fetches the data from the forkify API
export async function loadRecipe(id) {
    try {
        const data = await getJSON(`${API_URL}${id}?key=<${KEY}>`);

        let {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url, 
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            bookmarked: false
        };

        state.recipe.bookmarked = state.bookmarks.some(recipe => recipe.id == state.recipe.id);

    } catch(err) {
        throw err;
    }
}

export async function loadSearchResults(query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes;

        return state.search.results;
    } catch(err) {
        throw(err);
    }
}

export function getSearchResultsPage(page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    })

    state.recipe.servings = newServings;
}

export async function manageBookmark(recipeId) {
    await loadRecipe(recipeId);
    
    const index = state.bookmarks.findIndex(recipe => recipe.id == recipeId);

    if (index == -1) {
        state.bookmarks.push(state.recipe);
        state.recipe.bookmarked = true;
    }
    else {
        state.bookmarks.splice(index, 1);
        state.recipe.bookmarked = false;
    }

    persistBookmarks();
}

function persistBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

const storage = localStorage.getItem('bookmarks');

if (storage) {
    state.bookmarks = JSON.parse(storage);
}

export async function uploadRecipe(newRecipe) {
    try {
        console.log(Object.entries(newRecipe));
        const ingredients = Object.entries(newRecipe)
            .filter(entry => (entry[0].startsWith('ing') && entry[1]))
            .map(ing => {
                const ingArr = ing[1].replaceAll(' ', '').split(',');

                if (ingArr.length != 3) {
                    throw new Error('Wrong ingredient format!! Please use the correct format. Click on the overlay to continue');
                }

                const [quantity, unit, description] = ingArr;

                return {quantity: quantity? +quantity: null, unit, description};
            })

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.url,
            image_url: newRecipe.imageUrl,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.prepTime,
            servings: +newRecipe.servings,
            ingredients
        };

        console.log(recipe);

        const data = await sendJSON(`$${API_URL}?key=<${KEY}>`, recipe)

        console.log(data);
    } catch(err) {
        throw err;
    }
}