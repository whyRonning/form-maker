import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Preloader } from "../preloader/preloader";
import { useParams } from "react-router-dom";
export const AcceptAccount = () => {
  const { Id } = useParams();
  const { loading, error, data } = useQuery(
    gql`
      query acceptAcc($id: String!) {
        access(id: $id)
      }
    `,
    { variables: { id: Id } }
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
