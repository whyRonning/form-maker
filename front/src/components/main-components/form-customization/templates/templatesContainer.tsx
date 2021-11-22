import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../../store/mainReducer";
import { Templates } from "./templates";
import { FilterContainer } from "./filterContainer";
import { TemplateSelector } from "../../../../selectors/templateSelector";
import React from "react";
import { GlobalState } from "../../../../store/store";
let MapStateToProps = (state: GlobalState) => ({
  templates: TemplateSelector(state),
  isFilterVision: state.mainReducer.isFilterVision,
});
let TemplatesBlock = (props: propsType) => {
  let TemplatesMaker = props.templates.map((e, i) => (
    <Templates key={i} ApplyTemplateAC={props.ApplyTemplateAC} template={e} />
  ));
  return (
    <>
      <FilterContainer />
      <div
        className={
          props.isFilterVision ? "Templates-box openedFilter" : "Templates-box"
        }
      >
        {TemplatesMaker}
      </div>
    </>
  );
};
let TemplatesConnector = connect(MapStateToProps, {
  ApplyTemplateAC: actions.ApplyTemplateAC,
});
type propsType = ConnectedProps<typeof TemplatesConnector>;
export let TemplatesContainer = TemplatesConnector(TemplatesBlock);
