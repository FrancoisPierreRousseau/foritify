import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class PaginationView extends View {
  _parentElements = document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentElements.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');

      if(!btn) return;

      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }

  _generateMarkup(){
    const {results, resultsPerPage, page: currentPage} = this._data;
    const numPages = Math.ceil(results.length / resultsPerPage);
    const mapBtnMarkup = [];
    const isFirstPage = () => currentPage === 1 && numPages > 1;
    const isLastPage = () => currentPage === numPages && numPages > 1;
    const isFirstOrLastPage = () => isFirstPage() || isLastPage();
    const isOtherPages = currentPage < numPages;

    const generateMarkupBtnRight = () =>
      this._generateMarkupButton(currentPage + 1,'pagination__btn--next', `${icons}#icon-arrow-right` );

    const generateMarkupLeft = () =>
      this._generateMarkupButton(currentPage -1,`pagination__btn--prev`, `${icons}#icon-arrow-left` );

    isFirstOrLastPage() ? isFirstPage()?
      mapBtnMarkup.push(generateMarkupBtnRight()) : mapBtnMarkup.push(generateMarkupLeft())
      : isOtherPages ? mapBtnMarkup.push(generateMarkupLeft(),generateMarkupBtnRight()): ''
    return mapBtnMarkup.join('');
  }


  _generateMarkupButton(currentPage, classNameBtnPagination, arrowIcon){
    return `
          <button data-goto='${currentPage}' class="btn--inline ${classNameBtnPagination}">
            <svg class="search__icon">
              <use href="${arrowIcon}"></use>
            </svg>
            <span>Page ${currentPage}</span>
          </button>
      `
   }


}

export default new PaginationView()