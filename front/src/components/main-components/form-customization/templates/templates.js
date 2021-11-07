import React from "react";
export let Templates = React.memo((props) => {
  let handler = () => {
    props.ApplyTemplateAC(props.template);
  };
  return (
    <div className="Template">
      <h3>{props.template.settings.nameOfTemplate}</h3>
      <img onClick={handler} src={props.template.settings.image} alt="lorem" />
      <br />
      <button onClick={handler}>
        {props.template.settings.nameOfTemplate}
      </button>
    </div>
  );
});
