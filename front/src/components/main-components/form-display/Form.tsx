import React from "react";
import { FormInput } from "./FormInput";
import { HtmlCreatorBlock } from "../get-code/HtmlCreatorBlock";
import { dataInputNumParamType } from "../../../store/mainReducer";

type propsType = {
  inputs: Array<dataInputNumParamType>;
  generalBackgroundColor: string;
  numOfFields: number;
  buttHeight: number;
  buttWidth: number;
  formBackgroundColor: string;
  textColor: string;
  buttTextColor: string;
  buttColor: string;
  stateOfForm: boolean;
  title: string;
  titleColor: string;
  descriptionColor: string;
  formWidth: number;
  formMarginTop: number;
  labelsPosition: string;
  changeState: () => void;
};
export let Form = (props: propsType) => {
  if (props.inputs) {
    let InputsCreator = props.inputs.map((e, i) => {
      return (
        <FormInput
          key={i}
          labelsPosition={props.labelsPosition}
          i={i}
          numOfFields={props.numOfFields}
          type={e.type || "text"}
          name={e.name || ""}
          placeholder={e.placeholder || ""}
          fieldDescription={e.fieldDescription || ""}
          descriptionPosition={e.descriptionPosition || ""}
          width={e.width || 20}
          height={e.height || 5}
          descriptionColor={props.descriptionColor}
        />
      );
    });
    return (
      <>
        <div
          className="formBlock"
          style={{ backgroundColor: props.generalBackgroundColor }}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="form"
            style={{
              color: props.textColor,
              backgroundColor: props.formBackgroundColor,
              width: props.formWidth + "%",
              marginTop: props.formMarginTop + "vh",
            }}
          >
            <h1 className="FormTitle" style={{ color: props.titleColor }}>
              {props.title || "Заголовок"}
            </h1>
            <div
              className="wrapperOfInputsCreator"
              style={{
                gridTemplateColumns:
                  props.labelsPosition === "left" || props.numOfFields === 1
                    ? "1fr"
                    : "1fr 1fr",
              }}
            >
              {InputsCreator}
            </div>
            <button
              type="submit"
              onMouseOver={(e) => {
                e.currentTarget.style.color = props.buttColor;
                e.currentTarget.style.background = "none";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = props.buttTextColor;
                e.currentTarget.style.background = props.buttColor;
              }}
              style={{
                height: props.buttHeight + "vh",
                width: props.buttWidth + "vw",
                color: props.buttTextColor,
                backgroundColor: props.buttColor,
              }}
            >
              Отправить
            </button>
          </form>
        </div>
        <HtmlCreatorBlock
          generalBackgroundColor={props.generalBackgroundColor}
          formBackgroundColor={props.formBackgroundColor}
          titleColor={props.titleColor}
          descriptionColor={props.descriptionColor}
          textColor={props.textColor}
          buttColor={props.buttColor}
          buttTextColor={props.buttTextColor}
          formMarginTop={props.formMarginTop}
          formWidth={props.formWidth}
          buttHeight={props.buttHeight}
          buttWidth={props.buttWidth}
          numOfFields={props.numOfFields}
          title={props.title}
          labelsPosition={props.labelsPosition}
          inputs={props.inputs}
          stateOfForm={props.stateOfForm}
          changeState={props.changeState}
        />
      </>
    );
  } else {
    return (
      <>
        <form action="" method="post" />
      </>
    );
  }
};
