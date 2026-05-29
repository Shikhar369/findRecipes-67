import icons from 'url:../../src/img/icons.svg';

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length == 0)) {
            return this.renderError();
        }

        this._data = data;
        this._clear();
        const markup = this._generateMarkup();
        
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data) {
        if (!data || (Array.isArray(data) && data.length == 0)) {
            return this.renderError();
        }

        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));

        newElements.forEach((newEl, index) => {
            const curEl = curElements[index];
            
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }

            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value);
                })
            }
        })
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `
    
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                <div class="errorMessage">
                    ${message}
                </div>
            </div>
        `
    
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
            <div class="infoPara">
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                ${message}
            </div>
        `

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}