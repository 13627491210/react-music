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
  List,
  ActionSheet
} from "antd-mobile";
import "../PlayList/PlayList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageLoader from 'react-load-image';
import { getItem, setItem, removeItem } from "../../lib/api/localCache";
import first from '../../lib/images/first.jpg'

const Item = List.Item;
const Brief = Item.Brief;

function Preloader(props) {
  return <img src={first} style={{width:"50px",height:"50px"}}/>;
}

class PlayList extends Component {


  
  componentWillMount = async() => {
    console.log("传得ID",this.props.location.state.playlistid)
    const playlistid = this.props.location.state.playlistid
    this.setState({
      playlistid:playlistid,
      singer:"",
    })
    console.log("playlistid",this.state.playlistid,this.state.singer)
    
        console.log("shuju",this.state.playlist)
  }
  componentDidMount = async() => {
    console.log("props",this.props)
    console.log("props2",this.props.changeplay)
   console.log("id",this.props.location.state.item.coverImgUrl)
   const userInfo = JSON.parse(getItem("userInfo"));
   const playlist = JSON.parse(getItem("playList"));
   
   if(userInfo){
      var getsongs = "http://localhost:3000/playlist/detail?id="+this.state.playlistid;
      await axios(getsongs)
      .then((response) => {
        this.setState({
          playlist:response.data.playlist.tracks,
        playlistphoto: this.props.location.state.item.coverImgUrl
        })
      })
    }else{
      
    // if (this.props.location.state.playlist.playlist.length) {?
      const playlist = this.props.location.state.playlist.playlist;
      // console.log("playlist", playlist);
      // var getsongs = "http://localhost:3000/playlist/detail?id="+this.props.location.state.playlist.playlist[0].id;
      var getsongs = "http://localhost:3000/playlist/detail?id="+this.state.playlistid
      await axios(getsongs)
      .then((response) => {
        this.setState({
          playlist:response.data.playlist.tracks,
        playlistphoto: playlist[0].coverImgUrl
        })
      })
    }
  }
  //   const userInfo = JSON.parse(getItem("userInfo"));
  //   const playlist = JSON.parse(getItem("playList"));
  //   const playlistid = this.props.location.state.playlistid
  //   this.setState({
  //     playlistid:playlistid
  //   })
  //   console.log("playlistid",this.state.playlistid)
  //   if(userInfo){
  //     var getsongs = "http://localhost:3000/playlist/detail?id="+playlistid;
  //     await axios(getsongs)
  //     .then((response) => {
  //       this.setState({
  //         playlist:response.data.playlist.tracks,
  //       playlistphoto: playlist.playlist[0].coverImgUrl
  //       })
  //     })
  //   }else{
      
  //   // if (this.props.location.state.playlist.playlist.length) {?
  //     const playlist = this.props.location.state.playlist.playlist;
  //     // console.log("playlist", playlist);
  //     // var getsongs = "http://localhost:3000/playlist/detail?id="+this.props.location.state.playlist.playlist[0].id;
  //     var getsongs = "http://localhost:3000/playlist/detail?id="+this.state.playlistid
  //     await axios(getsongs)
  //     .then((response) => {
  //       this.setState({
  //         playlist:response.data.playlist.tracks,
  //       playlistphoto: playlist[0].coverImgUrl
  //       })
  //     })
  //   }
  //       console.log("shuju",this.state.playlist)
  //     // }
  //   }
  login = () => {};
  onHandleMusic =(item) => {
    console.log("歌曲",)
    console.log("歌曲",item)
    removeItem(JSON.stringify("music"))
    setItem("music",JSON.stringify(item))
    // this.props.changeplay();
    
    // document.getElementById("playing").className="play-container"

     
    this.props.history.push({
      pathname:"./Play",
      state:{
        // musicid:id,
        music:item,
        isShow:true,
      }
    })
  }
  state = {

    playlist: [],
    playlistphoto: "",
    song: "",
    singer: "",
    playlistid:"",
  }
  constructor(props) {
    super(props);
    this.state = {
      
    playlist: [],
    playlistphoto: "",
    song: "",
    singer: "",
    playlistid:"",
    };
  }
//   getSongs = () => {
//     console.log(this.props.location.state.playlist.playlist);
//     // this.setState({
//     //   playlist:this.props.location.state.playlist.playlist
//     // })
//     // this.props.location.state.playlist.playlist.map((item,i) => (
      
//     //   ( 
//     //     <div key={i} className="play-line">222222222222222{item.name}</div>
//     //           )
     
//     //           ));

//       //  return (
//       //   <React.Fragment>
//       //  <div className="play-line">222222222222222</div>
//       //  </React.Fragment>
//       //  ) 
//         //   <div className="play-line">
//         //     <div className="play-rank">1</div>
//         //     <div className="play-photo" />
//         //     <Link
//         //       to={{
//         //         pathname: "/Play"
//         //       }}
//         //     >
//         //       <div className="play-song">
//         //         <div>{item.name}</div>
//         //         <div>{item.name}</div>
//         //       </div>
//         //     </Link>
//         //     <div className="play-op">3</div>
//         //   </div>
//         // );
//       // }
      
//           // );
//     // this.state.playlist.playlist.map(item => {
//     // })
// }
  render() {
    const { playlistphoto, playlist } = this.state;
    return (
      <div className="list-container">
        <div className="list-cover-head">
          <Link
            // key={index}
            to={{
              pathname: "/Home",
              state: {
                // data: this.state.getRepastDataRes[index]
                // REC_ID: this.state.subDataRes
              }
            }}
          >
            <div
              className="iconfont icon-fanhui icon-back"
              onClick={this.back}
            />
          </Link>
          <div className="list-cover-title">推荐</div>
          <div className="iconfont icon-shenglve icon-operations" />
        </div>

        <div
          className="list-cover"
          style={{ backgroundImage: `url("${playlistphoto} ")`,backgroundRepeat:"no-repeat" }}
        />

        <div className="list-songs">
          {/* <List
            renderHeader={() => (
              <div className="list-head">
                <div className="iconfont icon-play play-all" />
                <div style={{ fontSize: "16px", color: "#000" }}>播放全部</div>
                <div style={{ fontSize: "14px", color: "#aaa" }}>(10)</div>
              </div>
            )}
            className="my-list"
          > */}
          {/* {playlist.map(item => {
             console.log("aa")
            //  alert("a"+item.coverImgUrl)
             console.log("aa")
           })} */}
          {/* {this.getSongs()} */}

          { playlist.map((item,i) => (
                 <div className="play-line" >
                   <div className="play-rank">{i+1}</div>
                   <ImageLoader
    src={item.al.picUrl}
    
  >
    <img style={{width:"50px",height:"50px"}} />
    <div>Error!</div>
    <Preloader />
  </ImageLoader>
                   {/* <div className="play-photo" style={{ backgroundImage: `url("${item.al.picUrl} ")` }}/> */}
                   {/* <Link
                     to={{
                       pathname: "/Play"
                     }}
                   > */}
                     <div className="play-song" key={i} onClick={() => {
                       
                          this.onHandleMusic(item)
                     }}>
                       <div className="play-song-name">{item.name}</div>
                       <div className="play-song-singer">{item.ar[0].name}</div>
                     </div>
                   {/* </Link> */}
                   <div className="iconfont icon-jinxingz play-op"></div>
                 </div>
          ))}
          {/* <div className="play-line">
                  <div className="play-rank">1</div>
              <div className="play-photo"></div>
              <Link
              to={{
                pathname: "/Play"
              }}
            >
              <div className="play-song">
                <div></div>
                <div>2</div>
              </div>
              
            </Link>
              <div className="play-op">3</div>
                </div> */}
          {/* </List> */}
        </div>
      </div>
    );
  }
}

export default PlayList;
