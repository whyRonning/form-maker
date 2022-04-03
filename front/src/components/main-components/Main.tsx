import React from "react";
import { FormContainer } from "./form-display/FormContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MiniHeaderSwitchContainer } from "./form-customization/MiniHeaderSwitchContainer";

type propsType = {
  isFillingVision: boolean;
  generalBackgroundColor: string;
  ChangeFillingVisionAC: () => void;
};
export const Main = (props: propsType) => (
  <>
    <div
      onClick={props.ChangeFillingVisionAC}
      title={
        props.isFillingVision
          ? "Закрыть настройки полей"
          : "Развернуть настройки полей"
      }
      className={
        props.isFillingVision ? "icon-angles-shown" : "icon-angles-hidden"
      }
    >
      <FontAwesomeIcon
        className="icon-left"
        icon={
          props.isFillingVision ? "angle-double-right" : "angle-double-left"
        }
        size="lg"
      />
    </div>
    <div
      className="output-closed-body"
      style={{ backgroundColor: props.generalBackgroundColor }}
    >
      <div
        className={
          props.isFillingVision ? "output-closed-s" : "output-opened-ss"
        }
      >
        <FormContainer />
      </div>
    </div>
    <div
      className={
        props.isFillingVision ? "input-closed-sss" : "input-opened-ssss"
      }
    >
      <MiniHeaderSwitchContainer />
    </div>
  </>
);
