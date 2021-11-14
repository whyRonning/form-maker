import React from "react";
import { Field } from "./Field";
import {message, Radio} from "antd";
import { dataType } from "../../../../store/authReducer";
import {dataInputNumParamType} from "../../../../store/mainReducer";

type propsType = {
  ChangeTitleAC: (text: string) => void;
  ChangeFormBackgroundColorAC: (text: string) => void;
  ChangeGeneralBackgroundColorAC: (text: string) => void;
  ChangeButtColorAC: (text: string) => void;
  ChangeButtTextColorAC: (text: string) => void;
  ChangeTitleColorAC: (text: string) => void;
  ChangeTextColorAC: (text: string) => void;
  ChangeDescriptionColorAC: (text: string) => void;
  ChangeFormWidthAC: (text: string) => void;
  ChangeButtWidthAC: (text: string) => void;
  ChangeFormMarginTopAC: (text: string) => void;
  ChangeButtHeightAC: (text: string) => void;
  ChangeLabelsPositionAC: (text: string) => void;
  ChangeNumOfFieldsAC: (text: string) => void;
  ChangeAddFieldAC: () => void;
  changeState: () => void;
  changeInput: (input: number | null) => void;
  saveTemplate:(obj:{variables:{token:string,template:dataType}})=>void;
  process: (data: dataInputNumParamType, index: number) => void;
  title: string;
  formBackgroundColor: string;
  generalBackgroundColor: string;
  buttColor: string;
  buttTextColor: string;
  titleColor: string;
  textColor: string;
  descriptionColor: string;
  formWidth: number;
  loading:boolean;
  buttWidth: number;
  buttHeight: number;
  formMarginTop: number;
  labelsPosition: string;
  numOfFields: number;
  selectedInput: number | null;
  token: string;
  inputs: Array<dataInputNumParamType>;
  InputsMaker: Array<JSX.Element>;
};
export const DataFilling = React.memo((props: propsType) => {
  return (
    <div className="dataFilling">
      <div className="dataFillingBlock">
        <label>Заголовок формы</label>
        <input
          value={props.title}
          name="title"
          placeholder="Заголовок"
          onChange={(e) => {
            props.ChangeTitleAC(e.target.value);
          }}
        />
        <br />
        <label>Выберете фон формы</label>
        <input
          value={props.formBackgroundColor}
          onChange={(e) => {
            props.ChangeFormBackgroundColorAC(e.target.value);
          }}
          name="formBackgroundColor"
          type="color"
        />
        <label>Выберете цвет общего фона</label>
        <input
          value={props.generalBackgroundColor}
          onChange={(e) => {
            props.ChangeGeneralBackgroundColorAC(e.target.value);
          }}
          name="generalBackgroundColor"
          type="color"
        />
        <label>Выберете цвет кнопки</label>
        <input
          value={props.buttColor}
          onChange={(e) => {
            props.ChangeButtColorAC(e.target.value);
          }}
          name="buttColor"
          type="color"
        />
        <label>Выберете цвет текста кнопки</label>
        <input
          value={props.buttTextColor}
          onChange={(e) => {
            props.ChangeButtTextColorAC(e.target.value);
          }}
          name="buttTextColor"
          type="color"
        />
        <label>Выберете цвет заголовка </label>
        <input
          value={props.titleColor}
          onChange={(e) => {
            props.ChangeTitleColorAC(e.target.value);
          }}
          name="titleColor"
          type="color"
        />
        <label>Выберете цвет текста </label>
        <input
          value={props.textColor}
          onChange={(e) => {
            props.ChangeTextColorAC(e.target.value);
          }}
          name="textColor"
          type="color"
        />
        <label>Выберете цвет описания поля</label>
        <input
          value={props.descriptionColor}
          onChange={(e) => {
            props.ChangeDescriptionColorAC(e.target.value);
          }}
          name="descriptionColor"
          type="color"
        />
        <br />
        <label>Ширина формы</label>
        <input
          value={props.formWidth}
          onChange={(e) => {
            props.ChangeFormWidthAC(e.target.value);
          }}
          name="formWidth"
          type="number"
        />
        %
        <br />
        <label>Отступ сверху</label>
        <input
          value={props.formMarginTop}
          onChange={(e) => {
            props.ChangeFormMarginTopAC(e.target.value);
          }}
          name="formMarginTop"
          type="number"
        />
        vh
        <br />
        <label>Ширина кнопки</label>
        <input
          value={props.buttWidth}
          onChange={(e) => {
            props.ChangeButtWidthAC(e.target.value);
          }}
          name="buttWidth"
          type="number"
        />
        vw
        <br />
        <label>Высота кнопки</label>
        <input
          value={props.buttHeight}
          onChange={(e) => {
            props.ChangeButtHeightAC(e.target.value);
          }}
          name="buttHeight"
          type="number"
        />
        vh
        <br />
        <label>Положение названия поля</label>
        <Radio.Button
          name="labelsPosition"
          onChange={(e) => {
            props.ChangeLabelsPositionAC(e.target.value);
          }}
          checked={props.labelsPosition === "top"}
          value="top"
        >
          Сверху
        </Radio.Button>
        <Radio.Button
          name="labelsPosition"
          checked={props.labelsPosition === "left"}
          onChange={(e) => {
            props.ChangeLabelsPositionAC(e.target.value);
          }}
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
            onChange={(e) => {
              props.ChangeNumOfFieldsAC(e.target.value);
            }}
            type="number"
          />
        </div>
        <br />
        <div className="blockItemsOfInputs">{props.InputsMaker}</div>
        <button
          name="count"
          onClick={() => {
            props.ChangeAddFieldAC();
          }}
        >
          Добавить поле
        </button>
        <div
          className={
            props.selectedInput !== null
              ? " FieldsBlock shown"
              : "FieldsBlock hidden"
          }
        >
          {props.selectedInput !== null && props.inputs[props.selectedInput] ? (
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
        <button
            disabled={props.loading}
          onClick={() => {props.token ?
            props.saveTemplate({
              variables: {
                token: props.token,
                template: {
                  generalBackgroundColor: props.generalBackgroundColor,
                  formBackgroundColor: props.formBackgroundColor,
                  titleColor: props.titleColor,
                  descriptionColor: props.descriptionColor,
                  formWidth: props.formWidth,
                  formMarginTop: props.formMarginTop,
                  buttHeight: props.buttHeight,
                  buttWidth: props.buttWidth,
                  textColor: props.textColor,
                  buttColor: props.buttColor,
                  buttTextColor: props.buttTextColor,
                  title: props.title,
                  labelsPosition: props.labelsPosition,
                  numOfFields: props.numOfFields,
                  inputs: props.inputs,
                },
              }
            })
              : message.warning("Для этого действия необходимо войти в аккаунт")
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
});
