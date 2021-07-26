export const HtmlCreator = (props) => {
  let keys = Object.keys(props.inputs);
  let re = /,/gi;
  let inputs = keys.map((e, i) => {
    if (props.inputs[keys[i]].type === "textarea") {
      return `<div class="wrapper-form-inputs-textarea"><div class="textOfInputs">${
        props.inputs[keys[i]].name
          ? `<label>${props.inputs[keys[i]].name}</label>`
          : ``
      }${
        props.inputs[keys[i]].fieldDescription
          ? `<p style="${
              props.inputs[keys[i]].descriptionPosition === "inline"
                ? "display:inline"
                : ""
            }">${
              props.inputs[keys[i]].descriptionPosition === "inline"
                ? "(" + props.inputs[keys[i]].fieldDescription + ")"
                : props.inputs[keys[i]].fieldDescription
            }</p>`
          : ""
      }
      </div><textarea style="height:${props.inputs[keys[i]].height}vh;width:${
        props.inputs[keys[i]].width
      }vw;" placeholder="${
        props.inputs[keys[i]].placeholder
      }"></textarea></div>`;
    } else if (props.inputs[keys[i]].type === "checkbox") {
      return `<div class="wrapper-form-inputs"><div style="display:grid;
      grid-template-columns: 1fr 1fr;align-items: center;" class="textOfInputs">${
        props.inputs[keys[i]].name
          ? `<label>${props.inputs[keys[i]].name}</label>`
          : ``
      }
      <input style="color:black;width:${props.inputs[keys[i]].width}vw;height:${
        props.inputs[keys[i]].height
      }vh" placeholder="${props.inputs[keys[i]].placeholder}" type="${
        props.inputs[keys[i]].type
      }"/></div></div>`;
    } else {
      /************Остальное ****************/
      return `<div class="wrapper-form-inputs"><div class="textOfInputs" >${
        props.inputs[keys[i]].name
          ? `<label>${props.inputs[keys[i]].name}</label>`
          : ``
      }${
        props.inputs[keys[i]].fieldDescription
          ? `<p style="${
              props.inputs[keys[i]].descriptionPosition === "inline"
                ? "display:inline"
                : ""
            }">${
              props.inputs[keys[i]].descriptionPosition === "inline"
                ? "(" + props.inputs[keys[i]].fieldDescription + ")"
                : props.inputs[keys[i]].fieldDescription
            }</p>`
          : ""
      }
      </div><input style="color:black;width:${
        props.inputs[keys[i]].width
      }vw;height:${props.inputs[keys[i]].height}vh" placeholder="${
        props.inputs[keys[i]].placeholder
      }" type="${props.inputs[keys[i]].type}"/></div>`;
    }
  });
  inputs = String(inputs).replace(re, "\n");
  return `Html: \n <div class="formBlock">\n<form class="form" action="/" method="Post"/> \n <h1 class="FormTitle">${
    props.title || "Заголовок"
  }</h1> \n <div class="wrapperOfInputsCreator">${inputs}</div> \n <button onclick="return false">Отправить</button>\n</form>\n</div>
   \n CSS:\n @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700;1,800;1,900&display=swap');
    * {margin: 0;padding: 0;font-family: 'Nunito', sans-serif;} 
   input:not([type="color"]) { padding-left: .2vw;}
   input { border-radius: 5px;border-width: 1px; outline: none;}
   .formBlock { background-color:${
     props.generalBackgroundColor
   };width: 100%;display: grid;justify-items: center;grid-gap: 2vw;} 
   .formBlock .form {text-align:center;margin-bottom: 2vw;font-size: 1.7vmin;height: -moz-fit-content;height: fit-content;padding: 2vw 3vw 2vw 3vw;grid-auto-rows: minmax(auto, 2vw);width:${
     props.formWidth
   }%;background-color:${props.formBackgroundColor};margin-top:${
    props.formMarginTop
  }vh}
   .formBlock .form h1 {color:${
     props.titleColor
   };grid-column: 1/3;text-align: center;}
   .formBlock .form button{cursor: pointer;width:${props.buttWidth}vw;height:${
    props.buttHeight
  }vh;color:${props.buttTextColor};background-color:${
    props.buttColor
  };outline: none;font-size: 0.9vw;border: none;margin-top: 2vw;transition: all ease 0.3s;}
  .formBlock .form button:hover {border:1px solid;color:${
    props.buttColor
  };background-color:${props.formBackgroundColor}}
  .formBlock .form .wrapperOfInputsCreator {display: grid;grid-gap: 3vw 5vw;grid-auto-rows: minmax(auto, auto);grid-template-columns: ${
    props.numOfFields === 2 && props.labelsPosition === "top"
      ? "1fr 1fr"
      : "1fr"
  };align-self: center;padding-top: 2vw;padding-bottom: 2vw; margin-bottom: 2vw;margin-top: 2vw;border-radius: .8vw;}
   .formBlock .form .wrapperOfInputsCreator .wrapper-form-inputs-textarea{display: grid;text-align: left;grid-template-columns: 1fr;grid-column-start: 1;grid-column-end: ${
     props.numOfFields === 2 && props.labelsPosition === "top" ? 3 : 2
   };${
    props.numOfFields === 2 && props.labelsPosition === "top"
      ? "justify-self: center;"
      : ""
  }${
    props.numOfFields === 1 && props.labelsPosition === "top"
      ? "justify-self: center;width: fit-content;"
      : "width: 100%;margin-left:8vw;"
  }}
  .formBlock .form .wrapperOfInputsCreator .textOfInputs{grid-gap: 1vw 1vw;align-self: center;}
  .textOfInputs p{ color:${props.descriptionColor}}
  .textOfInputs label {color:${props.textColor}}
  .wrapper-form-inputs-textarea textarea {color:black;max-height: 18vh;min-height: 15vh;grid-column: 1/3;}
  .formBlock .form .wrapperOfInputsCreator .wrapper-form-inputs {display: grid;text-align: left;${
    props.labelsPosition === "top"
      ? "grid-template-columns: 1fr;justify-self: center;width: -moz-fit-content;width: fit-content;"
      : "grid-template-columns: 1fr 1fr;width: 100%;"
  }}
  `;
};
