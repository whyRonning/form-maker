import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { Preloader } from "../preloader/preloader";
type PathParamsType = { Id: string };
let AcceptAccountBlock = (props: propsType) => {
  let { loading, error, data } = useQuery(
    gql`
      query acceptAcc($id: String!) {
        access(id: $id)
      }
    `,
    { variables: { id: props.match.params.Id } }
  );
  if (loading) {
    return <Preloader />;
  }
  if (error) {
    return (
      <p>
        {error.message === "err in req"
          ? "Ошибка в запросе"
          : error.message === "acc already accessed"
          ? "Аккаунт уже подтвержден"
          : "Что-то пошло не так"}
      </p>
    );
  }
  if (data) {
    return <p>Аккаунт подвержден</p>;
  }
  return <p />;
};
export let AcceptAccount = withRouter(AcceptAccountBlock);
type propsType = RouteComponentProps<PathParamsType>;
