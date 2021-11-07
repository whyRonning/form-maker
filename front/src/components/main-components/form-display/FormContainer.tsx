import {connect} from "react-redux";
import {Form} from "./Form";
import React from "react";
import {actions} from "../../../store/mainReducer";
import {GlobalState} from "../../../store/store";

type MapStateToPropsType = ReturnType<typeof MapStateToProps>;
type MapDispatchToPropsType = {
    ChangeStateOFFormAC: () => void
}
let MapStateToProps = (state: GlobalState) => {
    return {
        generalBackgroundColor: state.mainReducer.generalBackgroundColor,
        inputs: state.mainReducer.inputs,
        numOfFields: state.mainReducer.numOfFields,
        buttHeight: state.mainReducer.buttHeight,
        buttWidth: state.mainReducer.buttWidth,
        formBackgroundColor: state.mainReducer.formBackgroundColor,
        textColor: state.mainReducer.textColor,
        buttTextColor: state.mainReducer.buttTextColor,
        buttColor: state.mainReducer.buttColor,
        stateOfForm: state.mainReducer.stateOfForm,
        title: state.mainReducer.title,
        titleColor: state.mainReducer.titleColor,
        descriptionColor: state.mainReducer.descriptionColor,
        formWidth: state.mainReducer.formWidth,
        formMarginTop: state.mainReducer.formMarginTop,
        labelsPosition: state.mainReducer.labelsPosition
    };
};
let FormHOC: React.FC<any> = (props) => {
    let changeStyles = (e: any) => {
        e.currentTarget.style.color = props.buttColor;
        e.target.style.background = "none";
    };
    let revertStyles = (e: any) => {
        e.target.style.color = props.buttTextColor;
        e.target.style.background = props.buttColor;
    };
    return (
        <Form
            changeState={props.ChangeStateOFFormAC}
            stateOfForm={props.stateOfForm}
            revertStyles={revertStyles}
            changeStyles={changeStyles}
            {...props}
        />
    );
};

export let FormContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalState>(MapStateToProps, {ChangeStateOFFormAC: actions.ChangeStateOFFormAC})(
    FormHOC
);
