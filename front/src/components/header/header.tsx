import React from "react";
import { NavLink } from "react-router-dom";

type props = {
  isAuth: boolean;
  handler: () => void;
};
export const Header = (props: props) => (
  <header>
    <div className="header">
      <span className="logo-txt">
        <NavLink to="/">FormMaker</NavLink>
      </span>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/help">Помощь</NavLink>
      {props.isAuth ? (
        <p onClick={props.handler}>Выйти</p>
      ) : (
        <NavLink to="/account">Войти</NavLink>
      )}
    </div>
  </header>
);
