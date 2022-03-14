import { createSelector } from "reselect";
import { GlobalState } from "../store/store";
const getTemplates = (state: GlobalState) => {
  return state.mainReducer.templates;
};
const getFilters = (state: GlobalState) => {
  return state.mainReducer.filters;
};
export const TemplateSelector = createSelector(
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
