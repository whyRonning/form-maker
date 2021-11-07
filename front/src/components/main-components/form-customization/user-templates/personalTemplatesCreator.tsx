import { FormInput } from "../../form-display/FormInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {dataType} from "../../../../store/authReducer";
type props={
    DeleteTemplateThunk:(number:number)=>void,
    index:number,
    template:dataType,
    ApplyTemplateAC:(data:dataType)=>void,

}
export let PersonalTemplatesCreator = React.memo((props:props) => {
  let Cancel = () => {
    props.DeleteTemplateThunk(props.index);
  };
  let handler = () => {
    props.ApplyTemplateAC(props.template);
  };
  let InputsCreator = props.template.inputs.map((e, i) => {
    return (
      <FormInput
        key={i}
        labelsPosition={props.template.labelsPosition}
        i={i}
        numOfFields={props.template.numOfFields}
        type={props.template.inputs[i].type || "text"}
        name={props.template.inputs[i].name || ""}
        placeholder={props.template.inputs[i].placeholder || ""}
        fieldDescription={
          props.template.inputs[i].fieldDescription || ""
        }
        disabled={true}
        width={Number(props.template.inputs[i].width )/ 3 || 3}
        height={Number(props.template.inputs[i].height) / 3 || 3}
        descriptionPosition={
          props.template.inputs[i].descriptionPosition || ""
        }
        descriptionColor={props.template.descriptionColor}
      />
    );
  });
  return (
    <div
      style={{
        border: ".2vw solid #65ccbc",
        display: "grid",
        margin: "0 .5vw 0 .5vw"
      }}
    >
      <div className="deleteTemplate">
        <FontAwesomeIcon icon="times" onClick={Cancel}/>
      </div>
      <div
        className="personalFormBlock"
        onClick={handler}
        style={{ backgroundColor: props.template.generalBackgroundColor }}
      >
        <div
          className="form"
          style={{
            color: props.template.textColor,
            backgroundColor: props.template.formBackgroundColor,
            width: props.template.formWidth / 3 + "vw",
            marginTop: "5%",
            marginBottom: "5%"
          }}
        >
          <h1
            className="FormTitle"
            style={{
              color: props.template.titleColor
            }}
          >
            {props.template.title || "Заголовок"}
          </h1>
          <div
            className="wrapperOfInputsCreator"
            style={{
              gridTemplateColumns:
                props.template.labelsPosition === "left" ||
                props.template.numOfFields === 1
                  ? "1fr"
                  : "1fr 1fr"
            }}
          >
            {InputsCreator}
          </div>
          <button
            disabled
            style={{
              height: 4 + "vh",
              width: 9 + "vw",
              color: props.template.buttTextColor,
              backgroundColor: props.template.buttColor
            }}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
});
