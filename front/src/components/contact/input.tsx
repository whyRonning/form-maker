import React from "react";
type props={
    type:string,
    className:string,
    checked?:boolean,
    placeholder?:string,
    input:inputType
}
type inputType={
    name:string,
    value:string
}
export let Input:React.FC<props> = React.memo((props) => {
  let {  type, className,input } = props;
  return (
    <>
      <input
          {...input}
        className={className}
        checked={props.checked}
        placeholder={props.placeholder}
        type={type}
      />
    </>
  );
});
