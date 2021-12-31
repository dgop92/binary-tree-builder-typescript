export class HTML5Form {
  html5form: HTMLFormElement;
  onValidInput: (input: HTMLInputElement) => void;
  onInvalidInput: (input: HTMLInputElement) => void;
  onSuccesForm: (data: { [key: string]: string }) => void;
  inputs: NodeListOf<HTMLInputElement>;

  constructor(html5form: HTMLFormElement, inputQuery: string) {
    this.html5form = html5form;
    // tied to my implementation of the forms
    this.onValidInput = (input) => {
      input.parentElement?.classList.remove("invalid-input-container");
      input.nextElementSibling!.innerHTML = "";
    };
    this.onInvalidInput = (input) => {
      input.parentElement?.classList.add("invalid-input-container");
      input.nextElementSibling!.innerHTML = input.validationMessage;
    };
    this.onSuccesForm = (_) => {};
    this.inputs = this.html5form.querySelectorAll(inputQuery);

    this.init();
  }

  private init() {
    this.html5form.onsubmit = (e) => {
      e.preventDefault();

      const formData: { [key: string]: string } = {};

      this.inputs.forEach(function (input) {
        formData[input.name] = input.value;
      });

      this.onSuccesForm(formData);
      this.clearInputs();
    };

    this.inputs.forEach((input) => {
      const checkValidity = () => {
        if (!input.validity.valid) {
          this.onInvalidInput(input);
        } else {
          this.onValidInput(input);
        }
      };

      input.addEventListener("input", function (e) {
        checkValidity();
      });

      input.addEventListener("invalid", function (e) {
        e.preventDefault();
        checkValidity();
      });
    });
  }

  clearInputs() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
  }

  getInputByName(name: string): HTMLInputElement | null {
    this.inputs.forEach((input) => {
      if (input.getAttribute("name") === name) {
        return input;
      }
    });
    return null; // this is bad, but it cannot happen
  }
}
