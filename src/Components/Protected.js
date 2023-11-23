import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    let login = localStorage.getItem("token");
    if (!login) {
      localStorage.setItem("loginStatus", "Kamu belum login");
      navigate("/", {replace: true});
    }
  }, []);

  return (
    <Component />
  );
};

export default Protected;
