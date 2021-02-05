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
