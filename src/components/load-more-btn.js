import AbstractComponent from "./abstract-component.js";

const createLoadMoreBtnTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);

  }
}
