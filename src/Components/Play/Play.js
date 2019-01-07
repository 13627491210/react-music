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
import { getItem, removeItem } from "../../lib/api/localCache";

const Item = List.Item;
const Brief = Item.Brief;

class Play extends Component {
  back = () => {
    // this.setState({
    //   hide:"play-hide"
    // })

    // document.getElementById("playing").className="play-hide"
    const audio = document.getElementById("audio")
    audio.removeEventListener("timeupdate",this.myplay)
    this.props.history.goBack();
  };
  OnMovePc(e){
    let audio = document.getElementById("audio")
    if(audio.currentTime !== 0) {
        // let audio = this.refs.audio;
        console.log("pagex",e.pageX)
        console.log("pagex2",document.getElementById("played").style)
        console.log("pagex3",document.getElementById("line").style)
        console.log("pagex3",document.getElementById("movedot").style)
         const newWidth = ((e.pageX / 375 ) * 100 )
         document.getElementById("movedot").style.left = newWidth +"%"
         document.getElementById("played").style.width = (newWidth - 15)+"%"
         console.log("newwidth",newWidth)
        // document.getElementById("played").style.left;
        // document.getElementById("line").style.width;
        // let newWidth = (e.pageX - this.state.playedLeft) / this.refs.progress.offsetWidth;
        // document.getElementById("played").style.width = newWidth * 70 + "%";
        audio.currentTime = newWidth * audio.duration / 100;
    }
}
  myplay =  () => {
    //设置播放进度条
    const audio = document.getElementById("audio")
    console.log(audio.currentTime);
    let playPer = audio.currentTime / audio.duration;
    let mm =
          Math.floor((audio.duration / 60) % 60) < 10
            ? "0" + Math.floor((audio.duration / 60) % 60)
            : Math.floor((audio.duration / 60) % 60);
        let ss =
          Math.floor(audio.duration % 60) < 10
            ? "0" + Math.floor(audio.duration % 60)
            : Math.floor(audio.duration % 60);
        let duration = mm + ":" + ss;
        console.log("duration",duration)
        this.setState({
          duration: duration
        });
    document.getElementById("played").style.width = playPer * 70 + "%";
    document.getElementById("movedot").style.left = (playPer * 70+15) + "%";
    //设置缓冲进度条
    let timeRages = audio.buffered;
    let bufferedTime = 0;
    if (timeRages.length !== 0) {
      bufferedTime = timeRages.end(timeRages.length - 1);
    }
    let bufferedPer = bufferedTime / audio.duration;
    // this.refs.buffered.style.width = bufferedPer*100+"%";
    //设置剩余时间
    let remainTime = parseInt(audio.duration - audio.currentTime);
    let m =
      Math.floor((audio.currentTime / 60) % 60) < 10
        ? "0" + Math.floor((audio.currentTime / 60) % 60)
        : Math.floor((audio.currentTime / 60) % 60);
    let s =
      Math.floor(audio.currentTime % 60) < 10
        ? "0" + Math.floor(audio.currentTime % 60)
        : Math.floor(audio.currentTime % 60);
    let currentTimes = m + ":" + s;
    this.setState({
      currentTimes: currentTimes
    });
    // if(audio.ended){
    //     this.next()
    // }
  }
  onPlay = () => {
    const audio = document.getElementById("audio");

    console.log("isPlaying", this.state.isPlaying);
    this.setState({
      isPlaying: !this.state.isPlaying
    });
    console.log("isPlaying", this.state.isPlaying);
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
    const music = JSON.parse(getItem("music"));
    const audio = document.getElementById("audio");
    if (music) {
      const musicid = music.id;
      console.log(music.id);
      var getMusicUrl = "http://localhost:3000/song/url?id=" + musicid;

      axios.get(getMusicUrl).then(response => {
        console.log("歌曲地址", response.data.data[0].url);
        //  const musicurl = response.data.data[0].url
        this.setState({
          musicurl: response.data.data[0].url,
          musicname: music.name,
          musicsinger: music.ar[0].name,
          musicphoto: music.al.picUrl,
          isShow: this.props.location.state.isShow,
          isPlaying:true
        });

        if (audio.src != this.state.musicurl) {
          audio.src = this.state.musicurl;
          // this.setState({
          //   duration: audio.duration
          // });
        }
        audio.play();
        
        
        
        this.refs.play.className = "iconfont icon-pause play-icon-pause";
      });

      audio.addEventListener("timeupdate",this.myplay)
    }
    //   if(this.props.location){
    //   const music = this.props.location.state.music;
    //   console.log(this.props.location.state.music)
    //   const musicid = this.props.location.state.music.id;
    //   const isShow = this.props.location.state.isShow;
    //   console.log("isShow",isShow)
    //   var getMusicUrl = "http://localhost:3000/song/url?id=" + musicid;

    //   axios.get(getMusicUrl).then(response => {
    //     console.log("歌曲地址", response.data.data[0].url);
    //     this.setState({
    //       musicurl: response.data.data[0].url,
    //       musicname: music.name,
    //       musicsinger: music.ar[0].name,
    //       musicphoto: music.al.picUrl,
    //       isShow:isShow
    //     });
    //   });
    // }
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
    isPlaying: true,
    isShow: false,
    currentTimes: "0",
    duration: "0"
  };
  render() {
    const {
      musicname,
      musicphoto,
      musicsinger,
      musicurl,
      isShow,
      currentTimes,
      duration
    } = this.state;
    return (
      <div className={isShow ? "play-container" : "play-hide"}>
        <div
          className="play-bg"
          style={{ backgroundImage: `url("${musicphoto}")` }}
        >
          {" "}
        </div>
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
        {/* <audio  src={musicurl} id="audio" /> */}
        <div className="music-currenttime">{currentTimes}</div>
        <div
          className="progress-played"
          ref="played"
          id="played"
          onClick={this.OnMovePc}
        />
        <div className=" movedot" id="movedot"> </div>
        <div
          className="progress-buffered"
          ref="line"
          id="line"
          onClick={this.OnMovePc}
        />
        <div className="music-resttime">{duration}</div>
        <div className="play-btns">
          <div className="iconfont icon-shangyibu play-icon-up" id="icon-up" />
          <div
            className="iconfont icon-play play-icon-play"
            id="icon-play"
            ref="play"
            onClick={this.onPlay}
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
