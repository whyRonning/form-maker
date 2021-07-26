import React from "react";
import { DataFillingContainer } from "./DataFillingContainer";
import { MiniHeader } from "./miniHeader";
import { TemplatesContainer } from "./templatesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PersonalTemplatesContainer } from "./personalTemplatesContainer";
export let MiniHeaderSwitch = React.memo((props) => {
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
      ></MiniHeader>
      {props.stateOfHeader === 1 ? (
        <TemplatesContainer></TemplatesContainer>
      ) : props.stateOfHeader === 2 ? (
        <DataFillingContainer></DataFillingContainer>
      ) : props.stateOfHeader === 3 ? (
        <PersonalTemplatesContainer></PersonalTemplatesContainer>
      ) : (
        <div></div>
      )}
    </>
  );
});
