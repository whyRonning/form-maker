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
export const PersonalTemplatesCreator = React.memo((props: propsType) => {
  const [deconsteTempl, { error, data, loading }] = useMutation(
    gql`
      ${templateFragment}
      mutation deconsteTemplate($index: Int!, $token: String!) {
        deconsteTemplate(index: $index, token: $token) {
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
  const handler = () => {
    props.ApplyUserTemplateAC(props.template);
  };
  const InputsCreator = props.template.inputs.map((e, i) => (
    <FormInput
      key={i}
      labelsPosition={props.template.labelsPosition}
      i={i}
      numOfFields={props.template.numOfFields}
      type={e.type || "text"}
      name={e.name || ""}
      placeholder={e.placeholder || ""}
      fieldDescription={e.fieldDescription || ""}
      disabled={true}
      width={Number(e.width) / 3 || 3}
      height={Number(e.height) / 3 || 3}
      descriptionPosition={e.descriptionPosition || ""}
      descriptionColor={props.template.descriptionColor}
    />
  ));
  return (
    <div
      style={{
        border: ".2vw solid #65ccbc",
        display: "grid",
        margin: "0 .5vw 0 .5vw",
      }}
    >
      <div className="deconsteTemplate">
        <FontAwesomeIcon
          icon="times"
          title="deconsteTemplate"
          onClick={() => {
            if (!loading) {
              deconsteTempl({
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
