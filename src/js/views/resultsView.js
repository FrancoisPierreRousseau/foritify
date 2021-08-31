import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElements = document.querySelector('.results');
  _errorMessage = 'Nos recipes found for you query! Please try again';
  _message = ``;

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();