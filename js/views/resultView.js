import View from "./View";

class ResultView extends View {
    _parentElement = document.querySelector(".recipeContainer");
    _errorMessage = 'No recipes found for your query! Please try again';

    _generateMarkup() {
        const markup = this._data.map(recipe => {
            return `
                <div class="recipeDiv" id="${recipe.id}">
                    <div class="recipeLogo" style="background-image: url('${recipe.image_url}');">
                        
                    </div>
                    <div class="recipe_data">
                        <div class="recipe_name">
                            ${recipe.title}
                        </div> 
                        <div class="recipe_author">
                            ${recipe.publisher}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return markup;
    }

    renderPaginationDiv() {
        const markup = `
            <div class="pagination">                 
            </div>
        `;

        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }
}

export default new ResultView();