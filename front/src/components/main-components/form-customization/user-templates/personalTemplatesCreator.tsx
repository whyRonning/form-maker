import { FormInput } from "../../form-display/FormInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataType } from "../../../../store/authReducer";
import { gql, useMutation } from "@apollo/client";
import { message } from "antd";
import { templateFragment } from "../../../graphQl-fragments/templateFragment";
type propsType = {
  index: number;
  token: string;
  template: dataType;
  ApplyUserTemplateAC: (data: dataType) => void;
};
export let PersonalTemplatesCreator = React.memo((props: propsType) => {
  let [deleteTempl, { error, data, loading }] = useMutation(
    gql`
      ${templateFragment}
      mutation deleteTemplate($index: Int!, $token: String!) {
        deleteTemplate(index: $index, token: $token) {
          ...template
        }
      }
    `,
    { refetchQueries: ["getUserData"] }
  );
  if (error) {
    message.warn("Возникла ошибка, попробуйте позже");
  }
  if (data) {
    message.success("Шаблон удален");
  }
  let handler = () => {
    props.ApplyUserTemplateAC(props.template);
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
        fieldDescription={props.template.inputs[i].fieldDescription || ""}
        disabled={true}
        width={Number(props.template.inputs[i].width) / 3 || 3}
        height={Number(props.template.inputs[i].height) / 3 || 3}
        descriptionPosition={props.template.inputs[i].descriptionPosition || ""}
        descriptionColor={props.template.descriptionColor}
      />
    );
  });
  return (
    <div
      style={{
        border: ".2vw solid #65ccbc",
        display: "grid",
        margin: "0 .5vw 0 .5vw",
      }}
    >
      <div className="deleteTemplate">
        <FontAwesomeIcon
          icon="times"
          onClick={() => {
            if (!loading) {
              deleteTempl({
                variables: { index: props.index, token: props.token },
              });
            }
          }}
        />
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
            marginBottom: "5%",
          }}
        >
          <h1
            className="FormTitle"
            style={{
              color: props.template.titleColor,
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
                  : "1fr 1fr",
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
              backgroundColor: props.template.buttColor,
            }}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
});
