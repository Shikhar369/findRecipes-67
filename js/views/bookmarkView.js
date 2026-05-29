import View from "./View";

class BookmarkView extends View{
    _parentElement = document.querySelector(".recipeContainer");
    _errorMessage = 'No bookmarks found!!'

    addHandlerBookmark(handler) {
        document.querySelector('.bookmarks').addEventListener('click', function(event) {
            const button = event.target.closest('.bookmarks');

            if (!button) {
                return;
            }

            handler();
        })
    }

    addHandlerBookmarkButton(handler) {
        document.querySelector(".bookmark").addEventListener('click', function(event) {
            const button = event.target.closest('button');

            handler(button);
        })
    }

    _generateMarkup() {
        const markup = this._data.map(recipe => {
            return `
                <div class="recipeDiv" id="${recipe.id}">
                    <div class="recipeLogo" style="background-image: url('${recipe.image}');">
                        
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
}

export default new BookmarkView();