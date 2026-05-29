// This file is responsible for changing the view of the project 
// Basically the UI part
import icons from 'url:../../src/img/icons.svg';
import View from './View';

export class RecipeView extends View {
    _parentElement = document.querySelector(".recipe");
    _errorMessage = "We cound not find that recipe. Please try another one.";
    _message = 'Start by searching for a recipe or an ingredient. Have fun!';

    _generateMarkup() {
        return `
            <div class="img">
                    <img src="${this._data.image}" alt="${this._data.title}" width="800px" height="350px">
                </div>
                <div class="recipeName">
                    ${this._data.title}
                </div>
                <div class="basicInfo">
                    <div class="startingInfo">
                        <div class="time">
                            <svg>
                                <use href="${icons}#icon-clock"></use>
                            </svg>
                        <div> &nbsp;<span>${this._data.cookingTime}</span> &nbsp;MINUTES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </div>
                    <div class="servings">
                        <svg>
                            <use href="${icons}#icon-users"></use>
                        </svg>
                        <div> &nbsp;<span>${this._data.servings}</span> &nbsp;SERVINGS</div>
                        <div class="number">
                            <button class="subtract tiny">
                                <svg>
                                    <use href="${icons}#icon-minus-circle"></use>
                                </svg>
                            </button>
                            <button class='add tiny'>
                                <svg>
                                    <use href="${icons}#icon-plus-circle"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="extraInfo" id="${this._data.id}">
                    <div class="user">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div> 
                    <button class="bookmark ${this._data.bookmarked? 'bookmarked': ''}">
                        <svg>
                            <use href="${icons}#icon-bookmark-fill"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="ingridients">
                <div class="semiHeading">
                    RECIPE INGRIDIENTS
                </div>
                <div class="items">
                    ${this._data.ingredients.map(ing => {
                        return `<div class="item">
                                    <svg class="recipe__icon">
                                        <use href="${icons}#icon-check"></use>
                                    </svg>
                                    <div>
                                        ${ing.quantity? ing.quantity: ''} ${ing.unit} ${ing.description}
                                    </div>
                                </div>
                                `
                        }).join('')}
                </div>
            </div>
            <div class="end">
                <div class="semiHeading">
                    HOW TO COOK IT
                </div>
                <div class="credit">
                    This recipe was carefully designed and tested by <span>${this._data.publisher}</span> Please check out directions at their website.
                </div>
                <div class="creditButton">
                    <button onclick="window.location.href='${this._data.sourceUrl}'">
                        DIRECTIONS &rarr;
                    </button>
                </div>
            </div>
        `
    }

    addHandlerRender(handler) {
        document.querySelectorAll(".recipeDiv").forEach(recipe => recipe.addEventListener('click', handler));
    }

    addHandlerUpdateServings(handler) {
        const element = this;
        this._parentElement.addEventListener('click', function(event) {
            const button = event.target.closest('.tiny');

            if (!button) {
                return;
            }

            const currentServings = element._data.servings;

            if (button.classList.contains("add")) {
                handler(currentServings + 1);
            }
            else {
                if (currentServings > 1) {
                    handler(currentServings - 1);
                }
            }
        })
    }
} 

export default new RecipeView();