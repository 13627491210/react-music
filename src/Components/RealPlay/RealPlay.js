import React, { Component } from "react";
import "../Play/Play.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getItem, removeItem } from "../../lib/api/localCache";


class RealPlay extends Component {
  back = () =>{
    this.setState({
      hide:"play-hide"
    })
    
    // document.getElementById("playing").className="play-hide"
    this.props.history.push("/Home");
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
    // removeItem(JSON.stringify("music"))
    const music = JSON.parse(getItem("music"))
    if(music){
      const musicid = music.id;
      console.log(music.id)
      var getMusicUrl = "http://localhost:3000/song/url?id=" + musicid;
    
      axios.get(getMusicUrl).then(response => {
        console.log("歌曲地址", response.data.data[0].url);
        this.setState({
          musicurl: response.data.data[0].url,
          musicname: music.name,
          musicsinger: music.ar[0].name,
          musicphoto: music.al.picUrl,
          // isShow:true
        });
      });
    }
  };
  login = () => {};
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    musicphoto: "",
    musicname: "",
    musicsinger: "",
    musicurl: "",
    isPlaying: false,
    isShow:false,
    
  };
  render() {
    const { musicname, musicphoto, musicsinger, musicurl,isShow } = this.state;
    return (

      <div >
        <audio ref="playing" src={musicurl} id="audio" />

      </div>
    );
  }
}

export default RealPlay;
