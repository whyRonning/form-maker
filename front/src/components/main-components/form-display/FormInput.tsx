import React from "react";
type propsType = {
  type: string;
  numOfFields: number;
  labelsPosition: string;
  name: string;
  descriptionPosition: string;
  descriptionColor: string;
  width: number;
  height: number;
  disabled?: boolean;
  placeholder: string;
  fieldDescription: string;
  i: number;
};
export const FormInput = (props: propsType) => {
  let Field = () => {
    if (props.type === "textarea") {
      return (
        <div
          className={
            props.numOfFields === 2 && props.labelsPosition === "top"
              ? "wrapper-Form-Intputs-two-textarea "
              : "wrapper-Form-Intputs-one-textarea"
          }
          style={
            props.numOfFields === 1 && props.labelsPosition === "top"
              ? { justifySelf: "center", width: "fit-content" }
              : {}
          }
        >
          {props.name ? (
            <div className="textOfInputs">
              <label>{`${props.name}`}</label>
              <p
                style={{
                  display:
                    props.descriptionPosition === "inline" ? "inline" : "",
                  color: props.descriptionColor,
                }}
              >
                {!props.fieldDescription
                  ? ""
                  : props.descriptionPosition === "inline"
                  ? ` (${props.fieldDescription})`
                  : `${props.fieldDescription}`}
              </p>
            </div>
          ) : (
            ""
          )}

          <textarea
            disabled={props.disabled}
            style={{
              width: props.width + "vw",
              height: props.height + "vh",
              color: "black",
            }}
            placeholder={props.placeholder}
            required
          />
        </div>
      );
    } else if (props.type === "file") {
      return (
        <div
          className={
            props.numOfFields === 2 && props.labelsPosition === "top"
              ? "wrapper-Form-Intputs-two-textarea "
              : "wrapper-Form-Intputs-one-textarea"
          }
          style={{
            justifySelf:
              props.numOfFields === 1 && props.labelsPosition === "top"
                ? "center"
                : "left",
            width: "fit-content",
            marginLeft:
              props.numOfFields === 2 && props.labelsPosition === "top"
                ? "10%"
                : "",
          }}
        >
          {props.name ? (
            <div className="textOfInputs">
              <label>{`${props.name}`}</label>
              <p
                style={{
                  display:
                    props.descriptionPosition === "inline" ? "inline" : "",
                  color: props.descriptionColor,
                }}
              >
                {!props.fieldDescription
                  ? ""
                  : props.descriptionPosition === "inline"
                  ? ` (${props.fieldDescription})`
                  : `${props.fieldDescription}`}
              </p>
            </div>
          ) : (
            ""
          )}
          <input
            placeholder={props.placeholder}
            type={props.type || "text"}
            required
            disabled={props.disabled}
            style={{
              color: "black",
            }}
          />
        </div>
      );
    } else if (props.type === "checkbox") {
      return (
        <div
          className={
            props.numOfFields === 2 && props.labelsPosition === "top"
              ? "inputRadio wrapper-Form-CheckBoxes-two "
              : "inputRadio wrapper-Form-CheckBoxes-one"
          }
          style={
            props.numOfFields === 1 && props.labelsPosition === "top"
              ? { justifySelf: "center" }
              : props.numOfFields === 2 && props.labelsPosition === "top"
              ? { marginLeft: "10%" }
              : {}
          }
        >
          <div className="textOfInputs">
            {props.name ? (
              <label htmlFor={props.disabled ? "" : "inputRadio" + props.i}>
                {props.name}
              </label>
            ) : (
              ""
            )}
            <input
              style={{
                width: props.width + "vw",
                height: props.height + "vh",
                color: "black",
              }}
              id={"inputRadio" + props.i}
              type={props.type || "radio"}
              disabled={props.disabled}
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            props.labelsPosition === "top"
              ? "wrapper-Form-Intputs-top"
              : "wrapper-Form-Intputs-left"
          }
        >
          {props.name ? (
            <div className="textOfInputs">
              <label>{`${props.name} `}</label>
              <p
                style={{
                  display:
                    props.descriptionPosition === "inline" ? "inline" : "",
                  color: props.descriptionColor,
                }}
              >
                {!props.fieldDescription
                  ? ""
                  : props.descriptionPosition === "inline"
                  ? ` (${props.fieldDescription})`
                  : `${props.fieldDescription}`}
              </p>
            </div>
          ) : (
            ""
          )}
          <input
            placeholder={props.placeholder}
            type={props.type || "text"}
            required
            disabled={props.disabled}
            style={{
              width: props.width + "vw",
              height: props.height + "vh",
              color: "black",
            }}
          />
        </div>
      );
    }
  };
  return (
    <>
      <Field />
    </>
  );
};
