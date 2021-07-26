import React, { useState, useEffect } from "react";
import { Radio } from "antd";
export let Field = React.memo((props) => {
  useEffect(() => {
    setPlaceholder(props.inputs.placeholder || "");
    setTypeOfInput(props.inputs.type || "text");
    setName(props.inputs.name || "");
    setFieldDescription(props.inputs.fieldDescription || "");
    setDescriptionPosition(props.inputs.descriptionPosition || "bottom");
    setHeight(props.inputs.height || 5);
    setWidth(props.inputs.width || 20);
    setSize(props.inputs.height || 5);
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
  let handler = (e) => {
    e.target.name === "type" + props.index
      ? setTypeOfInput(e.target.value)
      : e.target.name === "placeholder"
      ? setPlaceholder(e.target.value)
      : e.target.name === "fieldDescription"
      ? setFieldDescription(e.target.value)
      : e.target.name === "size"
      ? setSize(e.target.value)
      : e.target.name === "descriptionPosition"
      ? setDescriptionPosition(e.target.value)
      : e.target.name === "width"
      ? e.target.value > 100
        ? setWidth(100)
        : e.target.value <= 0
        ? setWidth(1)
        : setWidth(e.target.value)
      : e.target.name === "height"
      ? e.target.value > 100
        ? setHeight(100)
        : e.target.value <= 0
        ? setHeight(1)
        : setHeight(e.target.value)
      : setName(e.target.value);
  };

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
            onChange={handler}
            value={name}
            placeholder="Название поля"
            type="text"
          />
        </label>
        <label>
          Placeholder поля
          <input
            name="placeholder"
            onChange={handler}
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
                onChange={handler}
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
                onChange={handler}
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
                onChange={handler}
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
          onChange={handler}
          value={fieldDescription}
          placeholder="Описание поля"
          type="text"
        />
        <Radio.Button
          name="descriptionPosition"
          onChange={handler}
          checked={descriptionPosition === "bottom" ? true : false}
          value="bottom"
        >
          Снизу
        </Radio.Button>
        <Radio.Button
          name="descriptionPosition"
          checked={descriptionPosition === "inline" ? true : false}
          onChange={handler}
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
              onChange={handler}
              checked={typeOfInput === "textarea" ? true : false}
            >
              Textarea
            </Radio.Button>
            <Radio.Button
              id={"input" + props.index}
              name={"type" + props.index}
              value="text"
              onChange={handler}
              checked={typeOfInput === "text" ? true : false}
            >
              Input
            </Radio.Button>
            <Radio.Button
              id={"flag" + props.index}
              name={"type" + props.index}
              value="checkbox"
              onChange={handler}
              checked={typeOfInput === "checkbox" ? true : false}
            >
              Checkbox
            </Radio.Button>
            <Radio.Button
              id={"file" + props.index}
              name={"type" + props.index}
              value="file"
              onChange={handler}
              checked={typeOfInput === "file" ? true : false}
            >
              File
            </Radio.Button>
            <Radio.Button
              id={"password" + props.index}
              name={"type" + props.index}
              value="password"
              onChange={handler}
              checked={typeOfInput === "password" ? true : false}
            >
              Password
            </Radio.Button>
            <Radio.Button
              id={"email" + props.index}
              name={"type" + props.index}
              value="email"
              onChange={handler}
              checked={typeOfInput === "email" ? true : false}
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
