import React from "react";
import { dataTemplatesNumbersFieldsType } from "../../../../store/mainReducer";
type propsType = {
  ApplyTemplateAC: (template: dataTemplatesNumbersFieldsType) => void;
  template: dataTemplatesNumbersFieldsType;
};
export let Templates = React.memo((props: propsType) => {
  let handler = () => {
    props.ApplyTemplateAC(props.template);
  };
  return (
    <div className="Template">
      <h3>{props.template.settings.nameOfTemplate}</h3>
      <img onClick={handler} src={props.template.settings.image} alt="lorem" />
      <br />
      <button onClick={handler}>
        {props.template.settings.nameOfTemplate}
      </button>
    </div>
  );
});
