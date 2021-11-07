import {withRouter} from "react-router-dom";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {AcceptThunk, AcceptThunkAxiosType} from "../../store/mainReducer";
import {useState} from "react";
import {RouteComponentProps} from "react-router";
type PathParamsType={
    Id:string
}
let AcceptAccountBlock = React.memo((props:propsType) => {
    let url = props.match.params.Id;
    let AcceptThunk = props.AcceptThunk;
    let [text, setText] = useState<string>("");
    useEffect(() => {
        let acceptAccount: () => void = () => {
            AcceptThunk("/api/access", "POST", {id: url}).then((res: AcceptThunkAxiosType | undefined) => {
                res ?
                    setText(res.message) : setText("Произошла ошибка, обновите страницу")
            }).catch(() => {
                setText("Произошла ошибка, обновите страницу")
            });
        };
        acceptAccount();
    }, [url, AcceptThunk]);
    return <div>{text}</div>;
});
let acceptWithRouter = withRouter(AcceptAccountBlock);
type propsType=RouteComponentProps<PathParamsType>&{AcceptThunk:any}
let AcceptAccountConnector = connect(null, {AcceptThunk});
export let AcceptAccount=AcceptAccountConnector(acceptWithRouter);
