import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home";
import Mine from './Components/Mine/Mine'
import PlayList from './Components/PlayList/PlayList'
import Play from './Components/Play/Play'
import Login from './Components/Login/Login'
import  { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
class App extends Component {
  state = {
    playUrl:"",
  }
  play = () => {
   const audio =  document.getElementById("audio")
   audio.play();
  }
  getplayurl = (url) => {
    console.log(url)
    this.setState({
        playUrl:url
    })
    this.play();
  }
  constructor(props){
    super(props)
    this.state={
      playUrl:"",
    }
  }
  render() {
    const playUrl = this.state;
    return(
      // <React.Fragment>
        
      // {/* <audio id="audio" src={playUrl} style={{display:"none"}}>涛狗</audio> */}
      // {/* <frameset cols="50%,50%">

      // <frame src="../"></frame> */}
// {/* <frame src="/log/music.html"></frame> */}
// {/* </frameset> */}
      <Router>
      <Switch>
        <Route path="/Home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route path="/Mine" component={Mine} />
        <Route path="/PlayList" component={PlayList} />
        <Route path="/Play" component={Play} />
        <Route path="/Login" component={Login} />
      </Switch>
    </Router>
    // </React.Fragment>
    )
     
  }
}

export default App;
