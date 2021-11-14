import React from "react";
import "./css/style.scss";
import { HeaderContainer } from "./components/header/headerContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import { HelpContainer } from "./components/contact/helpContainer";
import { MainContainer } from "./components/main-components/MainContainer";
import { AcceptAccount } from "./components/acc/acceptAccount";
import { AccountContainer } from "./components/acc/accountContainer";
import { gql, useQuery } from "@apollo/client";
import { dataType } from "./store/authReducer";
import { Preloader } from "./components/preloader/preloader";
import { templateFragment } from "./components/graphQl-fragments/templateFragment";

type propsType = {
  stateOfHeader: number;
  isFillingVision: boolean;
  isAuthAC: (
    isAuth: boolean,
    templates: Array<dataType>,
    token: string
  ) => void;
};
export const App = (props: propsType) => {
  let userToken = localStorage.getItem("token");
  let { loading } = useQuery(
    gql`
      ${templateFragment}
      query getUserData($userToken: String) {
        getUsersData(userToken: $userToken) {
          templates {
            ...template
          }
          token
        }
      }
    `,
    {
      variables: {
        userToken: userToken ? userToken.replace(/"/g, ``) : null,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        props.isAuthAC(
          true,
          data.getUsersData.templates,
          data.getUsersData.token
        );
      },
    }
  );
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className="App">
      <HeaderContainer />
      <main>
        <Switch>
          <Route exact path="/" render={() => <MainContainer />} />
          <Route exact path="/help" render={() => <HelpContainer />} />
          <Route exact path="/account" render={() => <AccountContainer />} />
          <Route exact path="/accept/:Id" render={() => <AcceptAccount />} />
          <Redirect to={"/"} />
        </Switch>
      </main>
    </div>
  );
};


