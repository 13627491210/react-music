import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home";
import Mine from './Components/Mine/Mine'
import PlayList from './Components/PlayList/PlayList'
import Play from './Components/Play/Play'
import Login from './Components/Login/Login'
import RealPlay from './Components/RealPlay/RealPlay'
import  { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom'
class App extends Component {
  state = {
    playUrl:"",
    showPlay:false,
  }
  play = () => {
   const audio =  document.getElementById("audio")
   audio.play();
  }
  changeplay = () => {
    this.setState({
      showPlay:!this.state.showPlay
    })
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
      showPlay:false,
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
<div className="soulHome">
      
      <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Home" component={Home} />
        <Route path="/Mine" component={Mine} />
        <Route path="/Play" component={Play} />
        <Route path="/PlayList" component={PlayList} changeplay={this.changeplay}/>
        <Route path="/Login" component={Login} />
      </Switch>
    </Router>
    <RealPlay></RealPlay>
    {/* <Play   showPlay={this.state.showPlay} changeplay={this.changeplay} ></Play> */}
    </div>
    // </React.Fragment>
    )
     
  }
}

export default App;
