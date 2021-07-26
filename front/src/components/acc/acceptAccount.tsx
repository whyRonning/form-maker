import {withRouter} from "react-router-dom";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {AcceptThunk, AcceptThunkAxiosType} from "../../store/mainReducer";
import {useState} from "react";
import {RouteComponentProps} from "react-router";

type paramForWithRouter = {
    Id: string
}
type props = {
    AcceptThunk: (url: string, method: string, body: { id: string }) => Promise<AcceptThunkAxiosType | undefined>
}
let AcceptAccountBlock: React.FC<RouteComponentProps<paramForWithRouter> & props> = React.memo((props) => {
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
let da = withRouter(AcceptAccountBlock);
export let AcceptAccount = connect(null, {AcceptThunk})(da);
