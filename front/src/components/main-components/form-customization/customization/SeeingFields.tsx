import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { dataInputNumParamType } from "../../../../store/mainReducer";
type propsType = {
  changeInput: (index: number | null) => void;
  index: number;
  ChangeDeleteFieldAC: (index: number) => void;
  inputs: dataInputNumParamType;
};
export let SeeingFields = (props: propsType) => {
  let changeInputIndex = () => {
    props.changeInput(props.index);
  };
  let [isObjVision, setIsObjVision] = useState(true);
  let DeleteField = async () => {
    setIsObjVision(!isObjVision);
    await setTimeout(() => {
      props.ChangeDeleteFieldAC(props.index);
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
        <FontAwesomeIcon onClick={DeleteField} icon="times" />
      </div>

      <div className="IconsOfInputs">
        <FontAwesomeIcon onClick={changeInputIndex} icon="cogs" />
      </div>
    </div>
  );
};
