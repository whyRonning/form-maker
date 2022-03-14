import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../../store/mainReducer";
import { Filter } from "./filter";
import React from "react";
import { GlobalState } from "../../../../store/store";

const MapStateToProps = (state: GlobalState) => ({
  templates: state.mainReducer.templates,
  filters: state.mainReducer.filters,
  isFilterVision: state.mainReducer.isFilterVision,
});
const FilterBlock = (props: propsType) => {
  const VisionFilter = () => {
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
const FilterConnector = connect(MapStateToProps, {
  FiltersAC: actions.FiltersAC,
  ChangeIsFilterVision: actions.ChangeIsFilterVision,
});
type propsType = ConnectedProps<typeof FilterConnector>;
export const FilterContainer = FilterConnector(FilterBlock);
