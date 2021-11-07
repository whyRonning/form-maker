import React from "react";
import { DataFillingContainer } from "./customization/DataFillingContainer";
import { MiniHeader } from "./miniHeader";
import { TemplatesContainer } from "./templates/templatesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PersonalTemplatesContainer } from "./user-templates/personalTemplatesContainer";
type props={
    ChangeFillingVisionAC:()=>void,
    isFillingVision:boolean,
    stateOfHeader:number,
    isAuth:boolean,
    stateOfHeaderAC:(num:number)=>void

}
export let MiniHeaderSwitch = (props:props) => {
  return (
    <>
      <div
        onClick={props.ChangeFillingVisionAC}
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
      <MiniHeader
        stateOfHeader={props.stateOfHeader}
        isAuth={props.isAuth}
        stateOfHeaderAC={props.stateOfHeaderAC}
      />
      {props.stateOfHeader === 1 ? (
        <TemplatesContainer />
      ) : props.stateOfHeader === 2 ? (
        <DataFillingContainer />
      ) : props.stateOfHeader === 3 ? (
        <PersonalTemplatesContainer />
      ) : (
        <div />
      )}
    </>
  );
};
