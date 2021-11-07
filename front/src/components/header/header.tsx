import React from "react";
import { NavLink } from "react-router-dom";

type props = {
  isAuth: boolean;
  LogoutThunk: () => void;
};
export let Header = (props: props) => {
  let handler = () => {
    props.LogoutThunk();
  };
  return (
    <header>
      <div className="header">
        <span className="logo-txt">
          <NavLink to="/">FormMaker</NavLink>
        </span>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/help">Помощь</NavLink>
        {props.isAuth ? (
          <p onClick={handler}>Выйти</p>
        ) : (
          <NavLink to="/account">Войти</NavLink>
        )}
      </div>
    </header>
  );
};
