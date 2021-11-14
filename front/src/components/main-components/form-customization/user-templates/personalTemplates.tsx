import React from "react";
import { PersonalTemplatesCreator } from "./personalTemplatesCreator";
import { dataType } from "../../../../store/authReducer";
type propsType = {
  userTemplates: Array<dataType>;
  ApplyUserTemplateAC: (data: dataType) => void;
  token: string;
};
export const PersonalTemplates = (props: propsType) => {
  let userTemplatesMaker = props.userTemplates.map((e, i) => {
    return (
      <PersonalTemplatesCreator
        key={i}
        index={i}
        token={props.token}
        template={props.userTemplates[i]}
        ApplyUserTemplateAC={props.ApplyUserTemplateAC}
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
