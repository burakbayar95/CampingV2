import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import "./App.css";
import "./Apps.scss";

function Detail() {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch(`https://localhost:44392/api/camps/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        console.log(data);
      });
  }

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <section className="dark">
            <div className="container py-4">
              <h1 className="h1 text-center" id="pageHeaderTitle">
                {item.name}
              </h1>

              <article className="postcard dark green">
                <a className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src={item.image}
                    alt="Image Title"
                  />
                </a>
                <div className="postcard__text">
                  <h1 className="postcard__title green">
                    <a href="#">
                      {item.genreId === 1 ? "Orman Kampı" : "Sahil Kampı"}
                    </a>
                  </h1>
                  <div className="postcard__subtitle small">
                    <time datetime="2020-05-25 12:00:00">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      {item.city.toUpperCase()} - Fiyat:{" "}
                      {item.price === 0 ? "Ücretsiz" : item.price}
                    </time>
                  </div>
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">
                    {item.description}
                  
                  </div>
                  <ul className="postcard__tagbox">
                    <li className="tag__item">
                      <i className="fas fa-tag mr-2"></i>
                      {item.city.toUpperCase()}
                    </li>
                    <li className="tag__item">
                    <i className="fas fa-money-check-alt"></i> &nbsp;
                    Ücret:   {item.price === 0 ? "Ücretsiz" : item.price}
                    </li>
                    <li className="tag__item play green">
                      <a href={item.campMap} target="_blank">
                      <i className="fas fa-route"></i> &nbsp; Rota
                      </a>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default Detail;
