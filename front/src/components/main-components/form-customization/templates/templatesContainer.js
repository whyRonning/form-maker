import { connect } from "react-redux";
import { actions} from "../../../../store/mainReducer";
import { Templates } from "./templates";
import { FilterContainer } from "./filterContainer";
import { TemplateSelector } from "../../../../selectors/templateSelector";
import React from "react";
let MapStateToProps = (state) => ({
  templates: TemplateSelector(state),
  isFilterVision: state.mainReducer.isFilterVision
});
let TemplatesBlock = (props) => {
  let templateKeys = Object.keys(props.templates);

  let TemplatesMaker = templateKeys.map((e, i) => (
    <Templates
      key={i}
      ApplyTemplateAC={props.ApplyTemplateAC}
      template={props.templates[templateKeys[i]]}
    />
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
export let TemplatesContainer = connect(MapStateToProps, {
  ApplyTemplateAC:actions.ApplyTemplateAC
})(TemplatesBlock);
