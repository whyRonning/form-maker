import React from "react";
import { PersonalTemplatesCreator } from "./personalTemplatesCreator";
import {dataType} from "../../../../store/authReducer";
type props={
  userTemplates:Array<dataType>,
  DeleteTemplateThunk:(num:number)=>void,
  ApplyTemplateAC:(data:dataType)=>void
}
export const PersonalTemplates = (props:props) => {
  let userTemplatesMaker = props.userTemplates.map((e, i) => {
    return (
      <PersonalTemplatesCreator
        key={i}
        index={i}
        template={props.userTemplates[i]}
        DeleteTemplateThunk={props.DeleteTemplateThunk}
        ApplyTemplateAC={props.ApplyTemplateAC}
      />
    );
  });
  if (props.userTemplates[0]) {
    return <div className="personalTemplatesBlock">{userTemplatesMaker}</div>;
  } else {
    return (
      <>
        <p>У вас пока нет шаблонов</p>
      </>
    );
  }
};
