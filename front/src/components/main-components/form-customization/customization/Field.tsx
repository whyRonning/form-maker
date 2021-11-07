import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import {dataInputNumParamType} from "../../../../store/mainReducer";

type props={
  inputs:{
    name: string,
    placeholder: string,
    type: string,
    width: number,
    height: number,
    fieldDescription: string,
    descriptionPosition: "inline" | "bottom"
  },
  index:number,
  changeInput:(val:string)=>void,
  process:(data:any,index:number)=>void


};
export let Field = React.memo((props:props) => {
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
    props.inputs.width
  ]);
  let [typeOfInput, setTypeOfInput] = useState("");
  let [placeholder, setPlaceholder] = useState("");
  let [name, setName] = useState("");
  let [fieldDescription, setFieldDescription] = useState("");
  let [descriptionPosition, setDescriptionPosition] = useState("");
  let [width, setWidth] = useState("");
  let [height, setHeight] = useState("");
  let [size, setSize] = useState("");
  let butHandler = () => {
    let data = {
      name,
      placeholder,
      type:typeOfInput,
      fieldDescription,
      descriptionPosition,
      width: typeOfInput === "checkbox" ? size : width,
      height: typeOfInput === "checkbox" ? size : height
    };
    props.process(data, props.index);
    props.changeInput("");
  };
  let changeInputHandler = () => {
    props.changeInput("");
  };
  return (
    <>
      <div className="fields">
        <h2>Настройки поля</h2>
        <label>
          Название поля
          <input
            name="name"
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
            placeholder="Название поля"
            type="text"
          />
        </label>
        <label>
          Placeholder поля
          <input
            name="placeholder"
            onChange={(e)=>{setPlaceholder(e.target.value)}}
            value={placeholder}
            placeholder="placeholder поля"
            type="text"
          />
        </label>
        <br />
        {typeOfInput === "checkbox" ? (
          <>
            <label>
              Размер поля
              <input
                name="size"
                onChange={(e)=>{setSize(e.target.value)}}
                value={size}
                placeholder="Размер поля"
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
              Ширина поля
              <input
                name="width"
                onChange={(e)=>{setWidth(Number(e.target.value)>100?"100":Number(e.target.value)<0?"0":e.target.value)}}
                value={width}
                placeholder="Ширина поля"
                type="number"
                step="0.1"
                min="0.1"
                max="99.9"
              />
              vw
            </label>
            <label>
              Высота поля
              <input
                name="height"
                onChange={(e)=>{setHeight(Number(e.target.value)>100?"100":Number(e.target.value)<0?"0":e.target.value)}}
                step="0.1"
                min="0.1"
                max="99.9"
                value={height}
                placeholder="Высота поля"
                type="number"
              />
              vh
            </label>
            <br />
          </>
        )}

        <label>Описание поля</label>
        <input
          name="fieldDescription"
          onChange={(e)=>{setFieldDescription(e.target.value)}}
          value={fieldDescription}
          placeholder="Описание поля"
          type="text"
        />
        <Radio.Button
          name="descriptionPosition"
          onChange={(e)=>{setDescriptionPosition(e.target.value)}}
          checked={descriptionPosition === "bottom" }
          value="bottom"
        >
          Снизу
        </Radio.Button>
        <Radio.Button
          name="descriptionPosition"
          checked={descriptionPosition === "inline"}
          onChange={(e)=>{setDescriptionPosition(e.target.value)}}
          value="inline"
        >
          Справа
        </Radio.Button>
        <br />
        <div className="typeOFieldBlock">
          <label>Тип поля</label>
          <div className="typeOField">
            <Radio.Button
              id={"textarea" + props.index}
              name={"type" + props.index}
              value="textarea"
              onChange={(e)=>{setTypeOfInput(e.target.value)}}
              checked={typeOfInput === "textarea" }
            >
              Textarea
            </Radio.Button>
            <Radio.Button
              id={"input" + props.index}
              name={"type" + props.index}
              value="text"
              onChange={(e)=>{setTypeOfInput(e.target.value)}}
              checked={typeOfInput === "text" }
            >
              Input
            </Radio.Button>
            <Radio.Button
              id={"flag" + props.index}
              name={"type" + props.index}
              value="checkbox"
              onChange={(e)=>{setTypeOfInput(e.target.value)}}
              checked={typeOfInput === "checkbox" }
            >
              Checkbox
            </Radio.Button>
            <Radio.Button
              id={"file" + props.index}
              name={"type" + props.index}
              value="file"
              onChange={(e)=>{setTypeOfInput(e.target.value)}}
              checked={typeOfInput === "file" }
            >
              File
            </Radio.Button>
            <Radio.Button
              id={"password" + props.index}
              name={"type" + props.index}
              value="password"
              onChange={(e)=>{setTypeOfInput(e.target.value)}}
              checked={typeOfInput === "password" }
            >
              Password
            </Radio.Button>
            <Radio.Button
              id={"email" + props.index}
              name={"type" + props.index}
              value="email"
              onChange={(e)=>{setTypeOfInput(e.target.value)}}
              checked={typeOfInput === "email" }
            >
              Email
            </Radio.Button>
          </div>
        </div>
        <button onClick={butHandler}>Сохранить</button>
        <button onClick={changeInputHandler}>Отменить</button>
      </div>
      <div onClick={changeInputHandler} className="modal" />
    </>
  );
});
