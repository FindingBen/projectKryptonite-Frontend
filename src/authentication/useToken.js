import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function useToken() {
  const history = useHistory();
  async function getToken() {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString == "undefined") {
      sessionStorage.removeItem("token");
    } else {
      return tokenString;
    }
  }

  const [token, setToken] = useState(getToken());

  async function saveToken(userToken) {
    setToken(userToken);
    return true;
  }

  const removeToken = () => {
    sessionStorage.removeItem("token");

    history.push("/login");

    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
