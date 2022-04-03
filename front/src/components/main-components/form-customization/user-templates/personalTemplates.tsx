import React from "react";
import { PersonalTemplatesCreator } from "./personalTemplatesCreator";
import { dataType } from "../../../../store/authReducer";
type propsType = {
  userTemplates: Array<dataType>;
  ApplyUserTemplateAC: (data: dataType) => void;
  token: string;
};
export const PersonalTemplates = (props: propsType) => {
  const userTemplatesMaker = props.userTemplates.map((e, i) => (
    <PersonalTemplatesCreator
      key={i}
      index={i}
      token={props.token}
      template={e}
      ApplyUserTemplateAC={props.ApplyUserTemplateAC}
    />
  ));
  if (props.userTemplates[0]) {
    return <div className="personalTemplatesBlock">{userTemplatesMaker}</div>;
  } else {
    return <p>У вас пока нет шаблонов</p>;
  }
};
