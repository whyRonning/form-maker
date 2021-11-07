import { createSelector } from "reselect";
import { GlobalState } from "../store/store";
let getTemplates = (state: GlobalState) => {
  return state.mainReducer.templates;
};
let getFilters = (state: GlobalState) => {
  return state.mainReducer.filters;
};
export let TemplateSelector = createSelector(
  getTemplates,
  getFilters,
  (templates, filters) => {
    if (filters[0]) {
      return templates.filter((e) => {
        return filters.indexOf(e.settings.group) > -1;
      });
    } else {
      return templates;
    }
  }
);
