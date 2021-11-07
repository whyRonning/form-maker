import { FormInput } from "../../FormInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export let PersonalTemplatesCreator = React.memo((props) => {
  let Cancel = () => {
    props.DeleteTemplateThunk(props.index);
  };
  let handler = () => {
    let template = {
      fields: props.template.inputs,
      settings: {
        buttColor: props.template.buttColor,
        buttHeight: props.template.buttHeight,
        buttTextColor: props.template.buttTextColor,
        buttWidth: props.template.buttWidth,
        descriptionColor: props.template.descriptionColor,
        formBackgroundColor: props.template.formBackgroundColor,
        labelsPosition: props.template.labelsPosition,
        numOfFields: props.template.numOfFields,
        textColor: props.template.textColor,
        title: props.template.title,
        titleColor: props.template.titleColor,
        generalBackgroundColor: props.template.generalBackgroundColor,
        formMarginTop: props.template.formMarginTop,
        formWidth: props.template.formWidth
      }
    };
    props.ApplyTemplateAC(template);
  };
  let inputsKeys = Object.keys(props.template.inputs);
  let InputsCreator = inputsKeys.map((e, i) => {
    return (
      <FormInput
        key={i}
        labelsPosition={props.template.labelsPosition}
        i={i}
        numOfFields={props.template.numOfFields}
        type={props.template.inputs[inputsKeys[i]].type || "text"}
        name={props.template.inputs[inputsKeys[i]].name || ""}
        placeholder={props.template.inputs[inputsKeys[i]].placeholder || ""}
        fieldDescription={
          props.template.inputs[inputsKeys[i]].fieldDescription || ""
        }
        disabled={true}
        width={props.template.inputs[inputsKeys[i]].width / 3 || 3}
        height={props.template.inputs[inputsKeys[i]].height / 3 || 3}
        descriptionPosition={
          props.template.inputs[inputsKeys[i]].descriptionPosition || ""
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
        <FontAwesomeIcon icon="times" onClick={Cancel}></FontAwesomeIcon>
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
            onMouseOver={props.template.changeStyles}
            onMouseLeave={props.template.revertStyles}
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
