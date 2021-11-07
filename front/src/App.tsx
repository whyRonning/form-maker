import React from "react";
import "./css/style.scss";
import {HeaderContainer} from "./components/header/headerContainer";
import {Route, Switch, Redirect} from "react-router-dom";
import {HelpContainer} from "./components/contact/helpContainer";
import {MainContainer} from "./components/MainContainer";
import {RegistrationContainer} from "./components/registration/registrationContainer";
import {AcceptAccount} from "./components/acc/acceptAccount";
import {useEffect} from "react";

import {AccountContainer} from "./components/acc/accountContainer";
import {PreloaderContainer} from "./components/preloader/preloaderContainer";
import {dataType as authDataType} from "./store/authReducer";

type props = {
    stateOfHeader: number,
    AuthThunk:(token?: string, templates?: Array<authDataType>, login?: string)=>void,
    isFillingVision: boolean
}
export const App: React.FC<props> = React.memo((props) => {
    let AuthThunk = props.AuthThunk;
    useEffect(() => {
        AuthThunk();
    }, [AuthThunk]);
    return (
        <div className="App">
            <HeaderContainer/>
            <main>
                <Switch>
                    <Route exact path="/" render={() => <MainContainer/>}/>
                    <Route exact path="/help" render={() => <HelpContainer  />}/>
                    <Route exact path="/account" render={() => <AccountContainer/>}/>
                    <Route exact path="/accept/:Id" render={() => <AcceptAccount/>}/>
                    <Route exact path="/registration" render={() => <RegistrationContainer/>}/>
                    <Redirect to={"/"}/>
                </Switch>
            </main>
            <PreloaderContainer/>
        </div>
    );
});
