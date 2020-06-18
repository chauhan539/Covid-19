import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import Columns from "react-columns"
import Form from "react-bootstrap/Form"
import CARDO from "./components/card"

function App() {
  ////data variables
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  /// for fetching the data from links and string them in variables
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")

      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



  ///this is for the image of flag
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  ///// for the current updated time formatting
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();



  //// this is used for our serach bar in here it will filter the data and accordingly shows stats
  const filterCountry = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item
  })



  /////showing cards 
  const countries_all = filterCountry.map((data, i) => {
    return (<Card key={i} bg="light" text="dark" className="text-center" style={{ margin: "10px", textAlign: "center" }} >
      <Card.Img variant="top" src={data.countryInfo.flag} />
      <Card.Body>
        <Card.Title>{data.country}</Card.Title>
        <Card.Text > Cases {data.cases}</Card.Text>
        <Card.Text > Deaths {data.deaths}</Card.Text>
        <Card.Text > Recovered {data.recovered}</Card.Text>
        <Card.Text > Cases Today {data.todayCases}</Card.Text>
        <Card.Text > Deaths Today {data.todayDeaths}</Card.Text>
        <Card.Text > Active Cases {data.active}</Card.Text>
        <Card.Text > Critical cases {data.critical}</Card.Text>
      </Card.Body>
    </Card>)
  })


  return (
    <div>
      <CardDeck>
        <Card bg="secondary" text="white" className="text-centre" style={{ margin: "10px", textAlign: "center" }} >
          <CARDO
            title="Cases"
            cases={latest.cases}
            last={lastUpdated}
          />
        </Card>
        <Card bg="danger" text="white" className="text-centre" style={{ margin: "10px", textAlign: "center" }} >
          <CARDO
            title="Deaths"
            cases={latest.deaths}
            last={lastUpdated}
          />
        </Card>
        <Card bg="success" text="white" className="text-centre" style={{ margin: "10px", textAlign: "center" }} >
          <CARDO
            title="Recovered"
            cases={latest.recovered}
            last={lastUpdated}
          />
        </Card>
        <Card bg="danger" text="white" className="text-centre" style={{ margin: "10px", textAlign: "center" }} >
          <CARDO
            title="Deaths Today"
            cases={latest.todayDeaths}
            last={lastUpdated}
          />
        </Card>
        <Card bg="secondary" text="white" className="text-centre" style={{ margin: "10px", textAlign: "center" }} >
          <CARDO
            title="Cases today"
            cases={latest.todayCases}
            last={lastUpdated}
          />
        </Card>
      </CardDeck>

      <Form>
        `{"\n"}
        <Form.Group controlId="formGroupSearch">
          <Form.Control type="text" placeholder="Search" onChange={(e => setSearchCountries(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)))} />
        </Form.Group>

      </Form>

      <Columns queries={queries}>{countries_all}</Columns>

    </div>

  );
}

export default App;
