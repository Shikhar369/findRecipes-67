import View from './View.js';

class AddRecipeView extends View {
    _uploadButton = document.querySelector(".uploadButton");
    _parentElement = document.querySelector(".modal");
    _overlay = document.querySelector(".overlay");
    _addRecipe = document.querySelector(".add");
    _closeWindow = document.querySelector(".closeButton");

    addHandlerWindow() {
        this._addRecipe.addEventListener('click', this.toggleWindow.bind(this));
        this._closeWindow.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    toggleWindow() {
        this._parentElement.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    addHandlerUpload(handler) {
        const classInfo = this;
        this._parentElement.addEventListener('submit', function(event) {
            event.preventDefault();

            const dataArr = [...new FormData(classInfo._parentElement)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }
}

export default new AddRecipeView();