import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import { dataInputNumParamType } from "../../../../store/mainReducer";

type propsType = {
  inputs: {
    id: string;
    name: string;
    placeholder: string;
    type: string;
    width: number;
    height: number;
    fieldDescription: string;
    descriptionPosition: "inline" | "bottom";
  };
  index: number;
  changeInput: (val: number | null) => void;
  process: (data: dataInputNumParamType, index: number) => void;
};
export const Field = React.memo((props: propsType) => {
  useEffect(() => {
    setPlaceholder(props.inputs.placeholder || "");
    setTypeOfInput(props.inputs.type || "text");
    setName(props.inputs.name || "");
    setFieldDescription(props.inputs.fieldDescription || "");
    setDescriptionPosition(props.inputs.descriptionPosition || "bottom");
    setHeight(String(props.inputs.height) || "5");
    setWidth(String(props.inputs.width) || "20");
    setSize(String(props.inputs.height) || "5");
  }, [
    props.inputs.placeholder,
    props.inputs.type,
    props.inputs.name,
    props.inputs.fieldDescription,
    props.inputs.descriptionPosition,
    props.inputs.height,
    props.inputs,
    props.inputs.width,
  ]);
  const [typeOfInput, setTypeOfInput] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [name, setName] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [descriptionPosition, setDescriptionPosition] = useState<
    "bottom" | "inline"
  >("bottom");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [size, setSize] = useState("");
  const butHandler = () => {
    const data = {
      name,
      id: props.inputs.id,
      placeholder,
      type: typeOfInput,
      fieldDescription,
      descriptionPosition,
      width: typeOfInput === "checkbox" ? Number(size) : Number(width),
      height: typeOfInput === "checkbox" ? Number(size) : Number(height),
    };
    props.process(data, props.index);
    props.changeInput(null);
  };
  const changeInputHandler = () => {
    props.changeInput(null);
  };
  return (
    <>
      <div className="fields">
        <h2>?????????????????? ????????</h2>
        <label>
          ???????????????? ????????
          <input
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="???????????????? ????????"
            type="text"
          />
        </label>
        <label>
          Placeholder ????????
          <input
            name="placeholder"
            onChange={(e) => {
              setPlaceholder(e.target.value);
            }}
            value={placeholder}
            placeholder="placeholder ????????"
            type="text"
          />
        </label>
        <br />
        {typeOfInput === "checkbox" ? (
          <>
            <label>
              ???????????? ????????
              <input
                name="size"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                value={size}
                placeholder="???????????? ????????"
                type="number"
                step="0.1"
                min="0.1"
                max="99.9"
              />
              vw
            </label>
            <br />
          </>
        ) : (
          <>
            <label>
              ???????????? ????????
              <input
                name="width"
                onChange={(e) => {
                  setWidth(
                    Number(e.target.value) > 100
                      ? "100"
                      : Number(e.target.value) < 0
                      ? "0"
                      : e.target.value
                  );
                }}
                value={width}
                placeholder="???????????? ????????"
                type="number"
                step="0.1"
                min="0.1"
                max="99.9"
              />
              vw
            </label>
            <label>
              ???????????? ????????
              <input
                name="height"
                onChange={(e) => {
                  setHeight(
                    Number(e.target.value) > 100
                      ? "100"
                      : Number(e.target.value) < 0
                      ? "0"
                      : e.target.value
                  );
                }}
                step="0.1"
                min="0.1"
                max="99.9"
                value={height}
                placeholder="???????????? ????????"
                type="number"
              />
              vh
            </label>
            <br />
          </>
        )}

        <label>???????????????? ????????</label>
        <input
          name="fieldDescription"
          onChange={(e) => {
            setFieldDescription(e.target.value);
          }}
          value={fieldDescription}
          placeholder="???????????????? ????????"
          type="text"
        />
        <Radio.Button
          name="descriptionPosition"
          onChange={(e) => {
            setDescriptionPosition(e.target.value);
          }}
          checked={descriptionPosition === "bottom"}
          value="bottom"
        >
          ??????????
        </Radio.Button>
        <Radio.Button
          name="descriptionPosition"
          checked={descriptionPosition === "inline"}
          onChange={(e) => {
            setDescriptionPosition(e.target.value);
          }}
          value="inline"
        >
          ????????????
        </Radio.Button>
        <br />
        <div className="typeOFieldBlock">
          <label>?????? ????????</label>
          <div className="typeOField">
            <Radio.Button
              id={"textarea" + props.index}
              name={"type" + props.index}
              value="textarea"
              onChange={(e) => {
                setTypeOfInput(e.target.value);
              }}
              checked={typeOfInput === "textarea"}
            >
              Textarea
            </Radio.Button>
            <Radio.Button
              id={"input" + props.index}
              name={"type" + props.index}
              value="text"
              onChange={(e) => {
                setTypeOfInput(e.target.value);
              }}
              checked={typeOfInput === "text"}
            >
              Input
            </Radio.Button>
            <Radio.Button
              id={"flag" + props.index}
              name={"type" + props.index}
              value="checkbox"
              onChange={(e) => {
                setTypeOfInput(e.target.value);
              }}
              checked={typeOfInput === "checkbox"}
            >
              Checkbox
            </Radio.Button>
            <Radio.Button
              id={"file" + props.index}
              name={"type" + props.index}
              value="file"
              onChange={(e) => {
                setTypeOfInput(e.target.value);
              }}
              checked={typeOfInput === "file"}
            >
              File
            </Radio.Button>
            <Radio.Button
              id={"password" + props.index}
              name={"type" + props.index}
              value="password"
              onChange={(e) => {
                setTypeOfInput(e.target.value);
              }}
              checked={typeOfInput === "password"}
            >
              Password
            </Radio.Button>
            <Radio.Button
              id={"email" + props.index}
              name={"type" + props.index}
              value="email"
              onChange={(e) => {
                setTypeOfInput(e.target.value);
              }}
              checked={typeOfInput === "email"}
            >
              Email
            </Radio.Button>
          </div>
        </div>
        <button onClick={butHandler}>??????????????????</button>
        <button onClick={changeInputHandler}>????????????????</button>
      </div>
      <div onClick={changeInputHandler} className="modal" />
    </>
  );
});
