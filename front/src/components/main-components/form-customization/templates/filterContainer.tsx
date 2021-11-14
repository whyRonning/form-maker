import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../../store/mainReducer";
import { Filter } from "./filter";
import React from "react";
import { GlobalState } from "../../../../store/store";

let MapStateToProps = (state: GlobalState) => ({
  templates: state.mainReducer.templates,
  filters: state.mainReducer.filters,
  isFilterVision: state.mainReducer.isFilterVision,
});
let FilterBlock = (props: propsType) => {
  let VisionFilter = () => {
    props.ChangeIsFilterVision();
  };

  return (
    <Filter
      FiltersAC={props.FiltersAC}
      isFilterVision={props.isFilterVision}
      VisionFilter={VisionFilter}
    />
  );
};
let FilterConnector = connect(MapStateToProps, {
  FiltersAC: actions.FiltersAC,
  ChangeIsFilterVision: actions.ChangeIsFilterVision,
});
type propsType = ConnectedProps<typeof FilterConnector>;
export let FilterContainer = FilterConnector(FilterBlock);
