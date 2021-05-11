import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";
import cancel from './cancel.png'
import dots from './dots.png'

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();
  const[sidebar,setSidebar]= React.useState(false);
  const[data,setData]= React.useState({});
  // const[loading,setLoading]= React.useState(false);
  console.log(countriesData);
  console.log(data);

  const getCountriesWithAxios = async () => {
    
    const response = await axios.get(countriesURL);
   
    setCountriesData(response.data);
    setCountriesData(response.data);
    console.log(response);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return ( 
    <>
   
    <Grid container>
      <div className={sidebar?"sidebar":"sidebar-none"}>
       <div className="sidebar_top_header">
        <img className="sidebar-close" src={cancel} height="20px" onClick={()=>setSidebar(false)}></img>
        
       </div>
       <div className="details">
       <h1 className="sidebar-details">Details</h1>
        <p classname="sidebar-name">{data.capital}</p>
        <img src={data.flag} height="30px"></img>
        <p classname="sidebar-name">{data.name}</p>
        <p classname="sidebar-name">{data.population}</p>
        <p classname="sidebar-name">{data.region}</p>
       </div>
      
      </div>

   
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow onClick={()=>{setData(country);
                      setSidebar(true);          }}>
                    <TableCell component="th" scope="row" >
                      {country.capital}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right">{country.name}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      </Grid>
    </>
  );
}

export default App;
