export enum SaveState {
  NotSaved,
  CategorySaved,
  FoodSaved,
  Saving,
  Error,
  NoTitle,
  NoImg,
  NoDesc,
  NoDays,
}

export const renderSaveMessage = (saveState: SaveState): string => {
  switch (saveState) {
    case SaveState.CategorySaved:
      return "Tu categoria ha sido guardada.";
    case SaveState.FoodSaved:
      return "Tu comida ha sido guardada.";
    case SaveState.Error:
      return "Error guardando";
    case SaveState.NoTitle:
      return "No hay nombre de categoria";
    case SaveState.NoImg:
      return "No haz establecido imagen";
    case SaveState.NoDays:
      return "No elegiste dias";
    default:
      return "";
  }
};
