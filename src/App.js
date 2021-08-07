import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Detail from "./Detail"
import {Link} from "react-router-dom";

function App() {
  const [data, setdata] = useState([]);
  const [choosen, setChosen] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchChangeHandler = (e) => {
    setDropdownOpen(true);
    setSearch(e.target.value);
  };

  const dropdownClickHandler = (item) => {
    setDropdownOpen(false);
    setChosen([...choosen, item]);
  };

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("https://localhost:44392/api/camps/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setdata(data);
      });
  }

  return (
    <Router>
      <Route exact path="/">

        <div>
          
        </div>



        <header class="header">
	<div class="overlay">
<h1 class="h1">Türkiye Kamp Alanları</h1>
<br/>
<br/>
<br/>
<p>İstediğiniz konumda arama yapabilir, öğelerin üzerine tıklayarak ayrıntılarını görebilirsiniz</p>
	<br/>
  <div
          style={{marginTop:"10px" ,justifyContent:"center", textAlign:"center", display: "flex", alignItems: "center" }}
          
          className="input-group"
        >
          <div className="form-outline">
            <input
              value={search}
              onChange={(e) => searchChangeHandler(e)}
              type="search"
              id="form1"
              className="form-control"
            />
            <label style={{color:"white"}} className="form-label" for="form1">
             Arama Yap
            </label>
          </div>
          <button type="button" className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
		</div>
</header>






       

        <section class="card-list">
          {search === "" || !dropdownOpen ? (
            <p style={{marginLeft:"auto",marginRight:"auto"}}>Lütfen arama yapınız</p>
          ): (
            <>
              {data
                .filter(
                  (item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.city.toLowerCase().includes(search.toLowerCase())
                )
                .map((data, index) => (
                  
                  <article className="card">
                    <header className="card-header">
                    
                    <Link to={`/detail/${data.id}`}> <h2>{data.name}</h2></Link>
                    </header>

                    <div className="card-author">
                      <a className="author-avatar a" href="#">
                        <img src={data.image} />
                      </a>
                      <svg className="half-circle" viewBox="0 0 106 57">
                        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                      </svg>
                      <div className="author-name">
                        <div className="author-name-prefix">{data.city}</div>
                        Fiyat: {data.price === 0 ? "Ücretsiz" : data.price}
                      </div>
                    </div>
                    <div className="tags">
                      <a className="a" href="#">
                        Şehir: {data.city}
                      </a>
                      <a className="a" href="#">
                        {data.genreId === 1 ? "Orman Kampı" : "Sahil Kampı"}
                      </a>
                      <a className="a" href="#">
                        Türkiye
                      </a>
                    </div>
                  </article>
                ))}
            </>
          ) }
        </section>
        
      </Route>
      <Route path="/detail/:id" component={Detail} />
    </Router>
  
  );
}

export default App;
