import { connect } from "react-redux";
import { actions } from "../../store/mainReducer";
import { Filter } from "./filter";
import React from "react";

let MapStateToProps = (state) => ({
  templates: state.mainReducer.templates,
  filters: state.mainReducer.filters,
  isFilterVision: state.mainReducer.isFilterVision
});
let FilterBlock = (props) => {
  let VisionFilter = () => {
    props.ChangeIsFilterVision();
  };
  let handler = (e) => {
    props.FiltersAC(e.target.name);
  };
  return (
    <Filter
      filters={props.filters}
      handler={handler}
      isFilterVision={props.isFilterVision}
      VisionFilter={VisionFilter}
    />
  );
};
export let FilterContainer = connect(MapStateToProps, {
  FiltersAC:actions.FiltersAC,
  ChangeIsFilterVision:actions.ChangeIsFilterVision
})(FilterBlock);
