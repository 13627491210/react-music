import React, { Component } from "react";
import {
  Button,
  TabBar,
  Tabs,
  Card,
  WingBlank,
  WhiteSpace,
  SearchBar,
  Icon,
  List
} from "antd-mobile";
import "../Play/Play.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Item = List.Item;
const Brief = Item.Brief;

class Play extends Component {
  back = () =>{
    this.props.history.goBack();
  };
  play = () => {
    const audio = document.getElementById("audio");

    this.setState({
      isPlaying: !this.state.isPlaying
    });

    if (this.state.isPlaying) {
      this.refs.play.className = "iconfont icon-play play-icon-play";

      audio.pause();
    } else {
      this.refs.play.className = "iconfont icon-pause play-icon-pause";
      audio.play();
    }
  };

  componentDidMount = () => {
    if(this.props.location){
      const music = this.props.location.state.music;
      const musicid = this.props.location.state.music.id;
      var getMusicUrl = "http://localhost:3000/song/url?id=" + musicid;
  
      axios.get(getMusicUrl).then(response => {
        console.log("歌曲地址", response.data.data[0].url);
        this.setState({
          musicurl: response.data.data[0].url,
          musicname: music.name,
          musicsinger: music.ar[0].name,
          musicphoto: music.al.picUrl
        });
      });
    }
   
  };
  login = () => {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  // back =() => {
  //   this.props.history.push({
  //     pathname:"./PlayList"
  //   })
  // }

  state = {
    musicphoto: "",
    musicname: "",
    musicsinger: "",
    musicurl: "",
    isPlaying: false
  };
  render() {
    const {showPlay} = this.props;
    const { musicname, musicphoto, musicsinger, musicurl } = this.state;
    return (
      <div className={showPlay?"play-container":"play-hide"}>
      <div className="play-bg" style={{backgroundImage:`url("${musicphoto}")`}}> </div>
        <div className="list-cover-head">
          {/* <Link
            // key={index}
            to={{
              pathname: "/PlayList",
              state: {
                // data: this.state.getRepastDataRes[index]
                // REC_ID: this.state.subDataRes
              }
            }}
          > */}
          <div
            className="iconfont icon-fanhui play-icon-back"
            onClick={this.back}
          />
          {/* </Link> */}
          <div className="play-cover-title">
            {musicname} - {musicsinger}
          </div>
          <div className="iconfont icon-shenglve play-icon-operations" />
        </div>

        <div
          className="play-cover"
          style={{ backgroundImage: `url("${musicphoto} ")` }}
        />
        <audio src={musicurl} id="audio" />

        <div className="play-btns">
          <div className="iconfont icon-shangyibu play-icon-up" id="icon-up" />
          <div
            className="iconfont icon-play play-icon-play"
            id="icon-play"
            ref="play"
            onClick={this.play}
          />
          <div
            className="iconfont icon-xiayibu play-icon-down"
            id="icon-down"
          />
        </div>
      </div>
    );
  }
}

export default Play;
