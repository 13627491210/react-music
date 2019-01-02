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
  NoticeBar,
  Accordion
} from "antd-mobile";
// import   {Image} from 'react-native';
import "../Home/Home.css";
import first from "../../lib/images/pho.jpg";
import timg from "../../lib/images/timg.jpg";
import { StickyContainer, Sticky } from "react-sticky";
import moment from "moment";
import images from "../../lib/images/first.jpg";
import { Link, Redirect } from "react-router-dom";
import ScrollEvent from "react-onscroll";
import iScroll from "iscroll";
import ContentCard from "../UnitComponents/ContentCard/ContentCard";
import fetchJsonp from "fetch-jsonp";
import http from "../../lib/api/http";
import axios from "axios";
import { getItem, setItem } from "../../lib/api/localCache";

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => (
        <div style={{ ...style, zIndex: 1, width: "100%" }}>
          <Tabs.DefaultTabBar {...props} />
        </div>
      )}
    </Sticky>
  );
}

// moment().format('MMMM Do YYYY, h:mm:ss a'); // 十二月 18日 2018, 3:17:42 下午
// moment().format('dddd');
const Panel = Accordion.Panel;
const tabs = [
  { title: "专辑", width: "100px", color: "red" }
  // { title: "封面" }
];
const src = "";
const underlinestyle = {
  textAlign: "center",
  width: "10%",
  marginLeft: "20%",
  // border:"1px",
  color: "#cc3300"
};
const textstyle = {
  textAlign: "center",
  // color:"#cc3300",
  fontSize: "12px"
  // paddingLeft:"20%",

  // marginLeft:"10%",
};
const pages = {
  // Tab:"1",
  // index:"1",
  // key:"1"
};
const nowdate = {};
class Home extends Component {
  onHandleGotoPlaylist = (e, item) => {
    // const playlist = this.props.location.state.playlist;
    // this.setState({
    //   // playlistname:playlist.playlist[0].name,
    //   // playlistid:playlist.playlist[0].id,
    //   playlist: playlist
    // });
    this.props.history.push({
      pathname: "./PlayList",
      state: {
        // playlist: this.state.playlist,
        playlistid: item.id,
        item: item
      }
    });
  };

  componentDidMount = () => {
    const userInfo = JSON.parse(getItem("userInfo"));
    const playlist = JSON.parse(getItem("playList"));
    
    if (userInfo) {
      // const playlist = this.props.location.state.playlist
      this.setState({
        // playlistname:playlist.playlist[0].name,
        // playlistid:playlist.playlist[0].id,
        playlist: playlist
      });
      setItem("playlist", JSON.stringify(playlist));
      
    } else {
      if (this.props.location.state.playlist) {
        const playlist = this.props.location.state.playlist;
        this.setState({
          // playlistname:playlist.playlist[0].name,
          // playlistid:playlist.playlist[0].id,
          playlist: playlist
        });
        setItem("playlist", JSON.stringify(playlist));
        // this.setState({
        // })
        console.log("playlistname", playlist.playlist[0].name);
        console.log("playlist", playlist.playlist);
        console.log("11111111111", this.state.playlist);
      }
    }
    // const getPlayUrl = ""
    // await axios.get()
    
    // this.setState({
    //   playlist:"11"
    // })
    // fetchJsonp("https://api.douban.com/v2/movie/in_theaters")
    //   .then(rep => rep.json())
    //   .then(data => {
    //     console.log(data);
    //   });

    //     var login = 'http://localhost:3000/login/cellphone?phone=13627491210&password=lin1314520';   //接口后台允许了跨域
    //  await axios.get(login)
    //     .then((response) => {
    //       console.log(response.data);
    //       const res = response.data;
    //       console.log("id",res.account.id)
    //       // id  = res.account.id
    //       const userid = res.account.id
    //       var getPlayList = 'http://localhost:3000/user/playlist?uid='+userid;   //接口后台允许了跨域

    //        axios.get(getPlayList)
    //       .then((response) => {
    //         const playlistid  = response.data.playlist[0].id;
    //         console.log("歌单"+response.data.playlist[0].id);
    //         // const res = response.data;

    //         var getMusicURL = 'http://localhost:3000/playlist/detail?id='+playlistid
    //         axios.get(getMusicURL)
    //         .then((response) => {
    //           // const playlistid  = response.data.playlist[0].id;
    //           const musicid = response.data.playlist.tracks[0].id
    //           console.log("歌单"+response.data.playlist.tracks[0].id);
    //           // const res = response.data;

    //           var getMusicPlay = 'http://localhost:3000/song/url?id='+musicid
    //           axios.get(getMusicPlay)
    //           .then((response) => {
    //             // const playlistid  = response.data.playlist[0].id;
    //             const music = response.data.data[0].url
    //             console.log("歌曲"+response.data.data[0].url);
    //             this.setState({
    //               music:music
    //             })
    //             console.log("音乐",this.state.music)
    //             // const res = response.data;

    //             // var getMusicURL = 'http://localhost:3000/playlist/detail?id='+playlistid

    //           })
    //         })
    //       })
    //     })

    const now = moment().format("YYYY年MM月DD日");
  };
  onTouchStart(ev) {
    const startX = ev.nativeEvent.changedTouches[0].pageX;
    const startY = ev.nativeEvent.changedTouches[0].pageY;
    this.setState({
      startX: startX,
      startY: startY
    });
    this.isTouching = true;
  }

  onTouchMove(ev) {
    const endX = ev.nativeEvent.changedTouches[0].pageX;
    const endY = ev.nativeEvent.changedTouches[0].pageY;
    console.log(this.state.startX);
    //获取滑动距离
    const distanceX = endX - this.state.startX;
    const distanceY = endY - this.state.startY;
    //判断滑动方向
    if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
      console.log("往右滑动");
    } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
      console.log("往左滑动");
    } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < -100) {
      console.log("往上滑动");
      this.move();
    } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 100) {
      console.log("往下滑动");
      this.moveUp();
    } else {
      console.log("点击未滑动");
    }
  }

  play1() {
    document.getElementById("floatview-songs").style.display = "block";
    document.getElementById("icon-up").style.display = "block";
    document.getElementById("icon-down").style.display = "block";
    document.getElementById("img").style.display = "block";
    document.getElementById("floatview").style.borderColor = "#fff";
    document.getElementById("icon-play").style.fontSize = "40";
    document.getElementById("floatview").style.zIndex = "0";
  }
  play = () => {
    // this.props.play();
    const audio = document.getElementById("music");

    this.setState({
      isPlaying: !this.state.isPlaying
    });

    if (this.state.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    // document.getElementById("floatview").className = "floatview2";
    document.getElementById("floatview-bg").style.animation =
      "changeBg 20s linear 0s 1";
    // setTimeout(this.play1,300)

    if (this.refs.play.className === "iconfont icon-play icon-play") {
      this.refs.play.className = "iconfont icon-pause icon-pause";
      document.getElementById("floatview-bg").style.animation =
        "changeBg 20s linear 0s 1";
      // this.refs.imgsong.className = "img-rotate";
    } else if (this.refs.play.className === "iconfont icon-pause icon-pause") {
      // alert(this.refs.play.className)
      this.refs.play.className = "iconfont icon-play icon-play";
      document.getElementById("floatview-bg").style.animationPlayState =
        "paused";
      document.getElementById("floatview").style.zIndex = "0";
      // document.getElementById("floatview-bg").style.animationPlayState = 'paused'
      // this.refs.imgsong.className = "img";
    }
  };
  moveUp = () => {
    document.getElementById("floatview").style.animation =
      "floatup 0.75s linear 0s 1 forwards";
    setTimeout(this.play1, 300);

    document.getElementById("floatview").style.backgroundImage=""
    // document.getElementById("floatview-bg").style.animation = 'changeBg 20s linear 0s 1'

    // this.refs.play.className === 'iconfont icon-shangyibu icon-pause' ?'iconfont icon-play icon-pause':'iconfont icon-shangyibu icon-pause'
    // this.refs.play.className = 'iconfont icon-shangyibu icon-pause'
  };

  move = () => {
    document.getElementById("floatview").style.backgroundSize="100% 100%"
    document.getElementById("floatview-songs").style.display = "none";
    document.getElementById("icon-up").style.display = "none";
    document.getElementById("icon-down").style.display = "none";
    document.getElementById("img").style.display = "none";
    document.getElementById("floatview").style.borderColor = "#108ee9";
    document.getElementById("floatview").style.width = "10vh";
    document.getElementById("icon-play").style.fontSize = "30px";
    document.getElementById("floatview").style.animation =
      "floatdown 0.75s linear 0s 1 forwards";
    document.getElementById("floatview").style.zIndex = "1";
    document.getElementById("floatview").style.backgroundImage=`url("${timg} ")`
  };
  state = {
    selectedTab: "blueTab",
    hidden: false,
    fullScreen: true,
    now: "",
    pullUpStatus: 0,
    pullDownStatus: 3,
    startX: "",
    startY: "",
    music: "",
    isPlaying: false,
    playlistname: "",
    playlistid: "",
    playlist: ""
  };
  constructor(props) {
    super(props);
    // this.state = {
    // };

    this.page = 1;
    this.itemsChanged = false;

    this.pullUpTips = {
      // 上拉状态
      0: "上拉发起加载",
      1: "松手即可加载",
      2: "正在加载",
      3: "加载成功"
    };

    this.pullDownTips = {
      // 下拉状态
      0: "下拉发起刷新",
      1: "继续下拉刷新",
      2: "松手即可刷新",
      3: "正在刷新",
      4: "刷新成功"
    };

    this.onTouchStart = this.onTouchStart.bind(this);
  }
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          textAlign: "center"
        }}
      />
    );
  }
  render() {
    const { now, playlistname, playlist } = this.state;
    return (
      <div
        style={
          this.state.fullScreen
            ? { position: "fixed", height: "8%", width: "100%", top: 0 }
            : { height: "100%" }
        }
      >
        <div
          style={{
            height: "100px",
            backgroundColor: "#108ee9",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            color: "#fff"
          }}
        >
          <SearchBar placeholder="搜索" className="searchbar" maxLength={8} />
          <div className="iconfont icon-tixing icon-message" />
          {/* <a src={this.state.music}></a> */}
          <audio src={this.state.music} id="music" onTouchEnd={this.play} />
          <div className="floatview" id="floatview">
            <div className="img" ref="imgsong" id="img" />
            {/* <img src="../../lib/images/timg.jpg"/> */}
            <div className="floatview-songs" id="floatview-songs">
              <div className="floatview-song">那些年</div>
              <div className="floatview-singer">胡夏</div>
            </div>
            <div className="iconfont icon-shangyibu icon-up" id="icon-up" onClick={this.palyPrevious}/>
            <div
              className="iconfont icon-play icon-play"
              id="icon-play"
              ref="play"
              onClick={this.play}
            />
            <div className="iconfont icon-xiayibu icon-down" id="icon-down" onClick={this.playNext}/>
          </div>
        </div>
        <div className="floatview-bg" id="floatview-bg" />
        <StickyContainer className="content">
          <div
            id="head"
            ref="head"
            onTouchMove={this.onTouchMove.bind(this)}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            style={{
              // display: "flex",
              // justifyContent: "center",
              backgroundColor: "#fff",
              alignContent: "stretch",
              overflow: "hidden",
              paddingTop: "10%"
            }}
          >
            {/* <p ref="PullDown" >{this.pullDownTips[this.state.pullDownStatus]}</p> */}
            {/* <ScrollEvent handleScrollCallback={this.handleScrollCallback} /> */}
            <div className="content-card-title">
              <span className="content-card-title-line" />
              <span className="content-card-title-text">推荐歌单</span>
            </div>
            <div className="content-cards">
              {/* <Link
                // key={index}
                to={{
                  pathname: "/PlayList",
                  state: {
                    playlist:this.state.playlist,

                    // data: this.state.getRepastDataRes[index]
                    // REC_ID: this.state.subDataRes
                  }
                }}
              > */}

              {this.state.playlist &&
                this.state.playlist.playlist.map((item, i) => {
                  return (
                    <ContentCard
                      title="收藏"
                      bgcolor="#cc3300"
                      key={i}
                      mbgcolor="#108ee9"
                      bgimage={first}
                      cardname={item.name}
                      onClick={e => {
                        this.onHandleGotoPlaylist(e, item);
                      }}
                    />
                  );
                })}

              {/* </Link> */}
              {/* <ContentCard title="推荐" bgcolor="#cc3300" mbgcolor="#108ee9" bgimage={first} cardname={playlistname}></ContentCard>
              <ContentCard title="推荐" bgcolor="#cc3300" mbgcolor="#108ee9" bgimage={first} cardname={playlistname}></ContentCard>
              <ContentCard title="推荐" bgcolor="#cc3300" mbgcolor="#108ee9" bgimage={first} cardname={playlistname}></ContentCard> */}
              {/* <div className="content-card" >
                 <div className="content-card-">话题</div>
              </div>
              <div className="content-card" />
              <div className="content-card" /> */}
            </div>
            <NoticeBar
              style={{
                backgroundColor: "rgb(16, 142, 233,0.1)",
                color: "#108ee9"
              }}
              marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}
            >
              如果说，五百次的前世回眸才换来的今生擦肩而过，那么，遇见了，我就不会放手。
              ---佛说
            </NoticeBar>

            <WingBlank size="lg">
              <WhiteSpace size="lg" />
              <Accordion className="my-accordion" onChange={this.onChange}>
                <Accordion.Panel
                  header={
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div className="panel-title">1</div>
                      <div className="panel-content">如果我还爱你</div>
                    </div>
                  }
                  className="pad"
                >
                  this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel
                  header={
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div className="panel-title">1</div>
                      <div className="panel-content">如果我还爱你</div>
                    </div>
                  }
                  className="pad"
                >
                  this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel
                  header={
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div className="panel-title">1</div>
                      <div className="panel-content">如果我还爱你</div>
                    </div>
                  }
                  className="pad"
                >
                  this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel
                  header={
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div className="panel-title">1</div>
                      <div className="panel-content">如果我还爱你</div>
                    </div>
                  }
                  className="pad"
                >
                  this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel
                  header={
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div className="panel-title">1</div>
                      <div className="panel-content">如果我还爱你</div>
                    </div>
                  }
                  className="pad"
                >
                  this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel
                  header={
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div className="panel-title">1</div>
                      <div className="panel-content">如果我还爱你</div>
                    </div>
                  }
                  className="pad"
                >
                  this is panel content2 or other
                </Accordion.Panel>
              </Accordion>
            </WingBlank>
            {/* </div> */}
            {/* <p ref="PullUp">{this.pullUpTips[this.state.pullUpStatus]}</p> */}
          </div>
        </StickyContainer>

        <div className="bottom-bar">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            className="bottom-bar"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="Life"
              icon={
                //   <Link
                //   // key={index}
                //   to={{
                //     pathname: '/Home',
                //     state: {
                //       // data: this.state.getRepastDataRes[index]
                //       // REC_ID: this.state.subDataRes
                //     }
                //   }}
                // >
                <div
                  className="iconfont icon-home mhome"
                  style={{
                    width: "22px",
                    height: "22px"
                    // background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                  }}
                />
                // </Link>
              }
              selectedIcon={
                <div
                  className="iconfont icon-home mhome"
                  style={{
                    width: "22px",
                    height: "22px"
                    // background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              selected={this.state.selectedTab === "blueTab"}
              // badge={1}
              onPress={() => {
                this.setState({
                  selectedTab: "blueTab"
                });
                this.props.history.push("/Home");

                // return(<Redirect to="/Mine"/>)
              }}
              data-seed="logId"
            >
              {this.renderContent("Life")}
            </TabBar.Item>

            {/* <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="Friend"
            key="Friend"
            // dot
            selected={this.state.selectedTab === "greenTab"}
            onPress={() => {
              this.setState({
                selectedTab: "greenTab"
              });
            }}
          >
            {this.renderContent("Friend")}
          </TabBar.Item> */}
            <TabBar.Item
              icon={
                //   <Link
                //   // key={index}
                //   to={{
                //     pathname: '/Mine',
                //     state: {
                //       // data: this.state.getRepastDataRes[index]
                //       // REC_ID: this.state.subDataRes
                //     }
                //   }}
                // >
                <div
                  className="iconfont icon-user mmine"
                  style={{
                    width: "22px",
                    height: "22px"
                    // background:
                    //   "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat"
                  }}
                />
                // </Link>
              }
              selectedIcon={
                <div
                  className="iconfont icon-user mmine"
                  style={{
                    width: "22px",
                    height: "22px"
                    // background:
                    //   "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat"
                  }}
                />
              }
              title="我的"
              key="my"
              selected={this.state.selectedTab === "yellowTab"}
              onPress={async () => {
                await this.setState({
                  selectedTab: "yellowTab"
                });
                this.props.history.push("/Mine");
              }}
            >
              {this.renderContent("My")}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}

export default Home;
