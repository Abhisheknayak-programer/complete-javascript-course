import icons from 'url:../../img/icons.svg';
export default class view{
    data;

    render(data){
        this.data = data;
        const markup = this._generateMarkup();
        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    _clear(){
        this.parentElement.innerHTML = '';
    }

    LoadSpinner(){
        const markup = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
        </div>`;
        this.parentElement.innerHTML = '';
        this.parentElement.insertAdjacentHTML('afterbegin',markup);
    }


    renderError(ErrorMessage = this.errorMessage){
        const markup = ` 
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${ErrorMessage}</p>
            </div>`;

        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin',markup);   
    }

    renderSuccess(SuccessMessage = this.successMessage){
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${SuccessMessage}</p>
        </div>`;

        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin',markup);   
    }

}