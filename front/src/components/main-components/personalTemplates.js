import React from "react";
import { PersonalTemplatesCreator } from "./personalTemplatesCreator";
export const PersonalTemplates = React.memo((props) => {
  let templateKeys = Object.keys(props.userTemplates);

  let userTemplatesMaker = templateKeys.map((e, i) => {
    return (
      <PersonalTemplatesCreator
        key={e}
        index={i}
        template={props.userTemplates[e]}
        DeleteTemplateThunk={props.DeleteTemplateThunk}
        ApplyTemplateAC={props.ApplyTemplateAC}
      ></PersonalTemplatesCreator>
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
});
