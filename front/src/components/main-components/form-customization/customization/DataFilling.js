import React from "react";
import { Field } from "./Field";
import { Radio } from "antd";
export const DataFilling = React.memo((props) => {
  return (
    <div className="dataFilling">
      <div className="dataFillingBlock">
        <label>Заголовок формы</label>
        <input
          value={props.title}
          name="title"
          placeholder="Заголовок"
          onChange={props.check}
        />
        <br />
        <label>Выберете фон формы</label>
        <input
          value={props.formBackgroundColor}
          onChange={props.check}
          name="formBackgroundColor"
          type="color"
        />
        <label>Выберете цвет общего фона</label>
        <input
          value={props.generalBackgroundColor}
          onChange={props.check}
          name="generalBackgroundColor"
          type="color"
        />
        <label>Выберете цвет кнопки</label>
        <input
          value={props.buttColor}
          onChange={props.check}
          name="buttColor"
          type="color"
        />
        <label>Выберете цвет текста кнопки</label>
        <input
          value={props.buttTextColor}
          onChange={props.check}
          name="buttTextColor"
          type="color"
        />
        <label>Выберете цвет заголовка </label>
        <input
          value={props.titleColor}
          onChange={props.check}
          name="titleColor"
          type="color"
        />
        <label>Выберете цвет текста </label>
        <input
          value={props.textColor}
          onChange={props.check}
          name="textColor"
          type="color"
        />
        <label>Выберете цвет описания поля</label>
        <input
          value={props.descriptionColor}
          onChange={props.check}
          name="descriptionColor"
          type="color"
        />
        <br />
        <label>Ширина формы</label>
        <input
          value={props.formWidth}
          onChange={props.check}
          name="formWidth"
          type="number"
        />
        %
        <br />
        <label>Отступ сверху</label>
        <input
          value={props.formMarginTop}
          onChange={props.check}
          name="formMarginTop"
          type="number"
        />
        vh
        <br />
        <label>Ширина кнопки</label>
        <input
          value={props.buttWidth}
          onChange={props.check}
          name="buttWidth"
          type="number"
        />
        vw
        <br />
        <label>Высота кнопки</label>
        <input
          value={props.buttHeight}
          onChange={props.check}
          name="buttHeight"
          type="number"
        />
        vh
        <br />
        <label>Положение названия поля</label>
        <Radio.Button
          name="labelsPosition"
          onChange={props.check}
          checked={props.labelsPosition === "top" }
          value="top"
        >
          Сверху
        </Radio.Button>
        <Radio.Button
          name="labelsPosition"
          checked={props.labelsPosition === "left" }
          onChange={props.check}
          value="left"
        >
          Слева
        </Radio.Button>
        <br />
        <div className={props.labelsPosition === "left" ? "hidden" : "shown"}>
          <label>Количество полей в строке</label>
          <input
            value={props.numOfFields}
            name="numOfFields"
            placeholder="Полей в строке"
            onChange={props.check}
            type="number"
          />
        </div>
        <br />
        <div className="blockItemsOfInputs">{props.InputsMaker}</div>
        <button name="count" onClick={props.check}>
          Добавить поле
        </button>
        <div
          className={
            props.selectedInput ? " FieldsBlock shown" : "FieldsBlock hidden"
          }
        >
          {props.inputs[props.selectedInput] ? (
            <Field
              changeInput={props.changeInput}
              inputs={props.inputs[props.selectedInput]}
              process={props.process}
              index={props.selectedInput}
            />
          ) : (
            <></>
          )}
        </div>
        <br />
        <button onClick={props.changeState}>Получить код</button>
        <br />
        <button onClick={props.saveFormHandler}>Сохранить</button>
      </div>
    </div>
  );
});
