import React from "react";
import "./News.css";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";

export default function News() {
  const [users, setUsers] = useState();
  async function getUser() {
    await fetch(`http://127.0.0.1:8000/api/v1/accounts/list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // .then((data) => setUser(data.json()))
      .then((data) => data.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className="footerDiv">
      <footer class="footer mt-auto py-3 bg-transparent">
        <Carousel>
        
          {users &&
            users.map((user) => {
              return (
                <Carousel.Item key={user.id}>
                  <h3>{user.city}</h3>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </footer>
    </div>
  );
}
