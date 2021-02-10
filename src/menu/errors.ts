export class CategoryNotSavedError extends Error {
  constructor(text = "") {
    super(text);
  }
}

export class FoodNotSavedError extends Error {
  constructor(text = "") {
    super(text);
  }
}

export class CustomError extends Error {
  public status;

  constructor(message = "", code: number) {
    super(message);
    this.status = code;
  }
}