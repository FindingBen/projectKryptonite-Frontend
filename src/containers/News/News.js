import React from "react";
import "./News.css";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState();
  async function getUser() {
    await fetch(`http://127.0.0.1:8000/api/v1/home/list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // .then((data) => setUser(data.json()))
      .then((data) => data.json())
      .then((data) => setNews(data));
  }
  console.log("SS", news);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="newsDiv">
      <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div class="col-md-6 px-0">
          <h1 class="display-4">News from Kryptonite team</h1>
          <p class="lead my-3">
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what’s most interesting in this post’s
            contents.
          </p>
        </div>
      </div>
      <div class="row mb-2">
        {news &&
          news.map((object) => {
            return (
              <div class="col-md-6">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div class="col p-4 d-flex flex-column position-static">
                    <h3 class="mb-0">{object.title}</h3>
                    <div class="mb-1 text-muted">Nov 12</div>
                    <p class="card-text mb-auto">{object.sub_title}</p>
                  </div>
                  <div class="col-auto d-none d-lg-block">
                    <img src={object.backgroung_img}></img>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
