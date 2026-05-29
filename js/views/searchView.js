import View from "./View";

class SearchView extends View {
    _parentElement = document.querySelector(".search");
    #inputField = this._parentElement.querySelector(".search input");
    #searchButton = this._parentElement.querySelector(".search button")

    getQuery() {
        const value = this.#inputField.value;
        this.clearInput();
        return value;
    }

    addHandlerSearch(handler) {
        this.#searchButton.addEventListener('click', function(event) {
            event.preventDefault();
            handler();
        });
    }

    clearInput() {
        this.#inputField.value = '';
    }
}

export default new SearchView();