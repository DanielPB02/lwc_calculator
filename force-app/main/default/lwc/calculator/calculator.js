import { LightningElement } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import mathjs from "@salesforce/resourceUrl/mathjs";

export default class Calculator extends LightningElement {
  mathjsLoaded;
  lastInputType;
  inputType;
  input;
  result;
  expression;

  constructor() {
    super();
    this.mathjsLoaded = false;
    this.lastInputType = "clear";
    this.result = 0;
    this.expression = "0";
  }

  renderedCallback() {
    if (!this.mathjsLoaded) {
      loadScript(this, mathjs + ".js")
        .then(() => {
          console.log("Loaded");
          this.mathjsLoaded = true;
        })
        .catch(() => console.log("Failed"));
    }
  }

  handleButton(event) {
    this.input = event.detail.value;
    this.inputType = event.detail.type;
    switch (this.inputType) {
      case "number":
        this.handleNumber(this.input);
        break;
      case "operator":
        this.handleOperator(this.input);
        break;
      case "clear":
        this.handleClear(this.input);
        break;
      case "result":
        this.handleResult(this.input);
        break;
      default:
        this.handleClear();
    }
    this.lastInputType = this.inputType;
  }

  handleNumber(number) {
    if (this.lastInputType === "number" || this.lastInputType === "operator") {
      this.appendValue(number);
    } else if (this.lastInputType === "result") {
      this.clearExpression();
      this.changeValue(number);
    } else if (this.lastInputType === "clear") {
      this.changeValue(number);
    }
  }

  handleOperator(sign) {
    if (
      this.lastInputType === "number" ||
      this.lastInputType === "clear" ||
      this.lastInputType === "result"
    ) {
      this.appendValue(sign);
    } else if (this.lastInputType === "operator") {
      this.changeValue(sign);
    }
  }

  handleClear() {
    this.clearExpression();
  }

  handleResult() {
    this.calculate();
  }

  appendValue(value) {
    this.expression = this.expression + value;
  }

  changeValue(value) {
    let newExpression = this.expression.slice(0, -1);
    this.expression = newExpression + value;
  }

  clearExpression() {
    this.expression = "0";
    this.result = 0;
  }

  calculate() {
    if (this.lastInputType === "number") {
      // eslint-disable-next-line no-undef
      this.result = math.evaluate(this.expression);
      this.expression = this.result;
    }
  }

  get expression() {
    return this.expression;
  }
}
