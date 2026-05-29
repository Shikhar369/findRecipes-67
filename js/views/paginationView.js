import View from "./View";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkup() {
        this._parentElement = document.querySelector(".pagination");
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        let markup = '';

        if (this._data.page == 1) {
            this._parentElement.classList.add('singleRight');
            markup = `
                <div class="rightButton">
                    <button data-goto="2">
                        Page <span>2</span> &rarr;
                    </button>
                </div>
            `
        }
        else if (this._data.page === numPages) {
            this._parentElement.classList.add('singleLeft');
            markup = `
                <div class="leftButton">
                    <button data-goto="${numPages - 1}">
                        &larr; Page <span>${numPages - 1}</span>
                    </button>
                </div>
            `
        }
        else {
            this._parentElement.classList.add('double');
            markup = `
                <div class="leftButton">
                    <button data-goto="${this._data.page - 1}">
                        &larr; Page <span>${this._data.page - 1}</span>
                    </button>
                </div>
                <div class="rightButton">
                    <button data-goto="${this._data.page + 1}">
                        Page <span>${this._data.page + 1}</span> &rarr;
                    </button>
                </div>
            `
        }
        
        return markup;
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(event) {
            const button = event.target.closest("button");

            if (!button) {
                return;
            }
            handler(button);
        })
    }
}

export default new PaginationView();