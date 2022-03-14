import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { dataInputNumParamType } from "../../../../store/mainReducer";
type propsType = {
  changeInput: (index: number | null) => void;
  index: number;
  ChangeDeconsteFieldAC: (index: number) => void;
  inputs: dataInputNumParamType;
};
export const SeeingFields = (props: propsType) => {
  const changeInputIndex = () => {
    props.changeInput(props.index);
  };
  const [isObjVision, setIsObjVision] = useState(true);
  const DeconsteField = async () => {
    setIsObjVision(!isObjVision);
    await setTimeout(() => {
      props.ChangeDeconsteFieldAC(props.index);
    }, 100);
  };

  return (
    <div
      className={isObjVision ? "ItemsOfInputs shown" : "ItemsOfInputs hidden"}
    >
      <div>
        <p>{props.inputs.name}</p>
      </div>

      <div className="IconsOfInputs">
        <FontAwesomeIcon
          title={"Удалить поле"}
          onClick={DeconsteField}
          icon="times"
        />
      </div>

      <div className="IconsOfInputs">
        <FontAwesomeIcon
          title={"Настройки поля"}
          onClick={changeInputIndex}
          icon="cogs"
        />
      </div>
    </div>
  );
};
