import { LightningElement, api } from "lwc";

export default class CalculatorButton extends LightningElement {
  @api
  buttonValue;

  @api
  buttonType;

  renderedCallback() {
    window.addEventListener("keypress", (event) => {
      if (event.key === this.buttonValue) {
        this.handleEvent();
      }
    });
  }

  handleClick() {
    this.handleEvent();
  }

  handleEvent() {
    let detail = { detail: { value: this.buttonValue, type: this.buttonType } };
    let event = new CustomEvent("buttonclick", detail);
    this.dispatchEvent(event);
  }
}
