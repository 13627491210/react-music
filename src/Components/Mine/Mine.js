import React, { Component } from "react";
import {
  Button,
  TabBar,
  Tabs,
  Card,
  WingBlank,
  WhiteSpace,
  SearchBar,
  Icon
} from "antd-mobile";
// import   {Image} from 'react-native';
import "../Mine/Mine.css";
import { StickyContainer, Sticky } from "react-sticky";
import { Link } from "react-router-dom";
import moment from "moment";
import images from "../../lib/images/first.jpg";
import { getItem, removeItem } from "../../lib/api/localCache";

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
const tabs = [
  { title: "专辑", width: "100px", color: "red" },
  { title: "封面" }
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
class Mine extends Component {
  componentDidMount = () => {
    const userInfo = JSON.parse(getItem("userInfo"))
    if(userInfo){
      this.setState({
      userphoto:userInfo.profile.avatarUrl,
      // userid: userInfo.acc.avatarUrl,
      nickname: userInfo.profile.nickname,
      userInfo:userInfo
    });
    }
    // this.setState({
    //   userphoto: this.props.location.state.userphoto,
    //   userid: this.props.location.state.userid,
    //   nickname: this.props.history.location.state.nickname
    // });
    // const now = moment().format("YYYY年MM月DD日");
    // this.setState({
    //   now: now
    // });
  };
  // login = () => {

  // }
  onHandleexit = () => {
    removeItem("userInfo")
    removeItem("playList")
    removeItem("music")
    this.props.history.push({
      pathname:"./login",
    });
  };
  state = {
    selectedTab: "yellowTab",
    hidden: false,
    fullScreen: true,
    userphoto:
      "https://p1.music.126.net/ycNFoIE67e6rlltrLTk7-g==/3416182645362509.jpg",
    userid: "",
    userwords: "",
    nickname: "",
    userInfo:[]
  };
  constructor(props) {
    super(props);
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
    const { now, userphoto, userwords, userid, nickname,userInfo } = this.state;
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
            height: "70px",
            backgroundColor: "#108ee9",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <div className="top-title">
            <div className="top-title-text">时间是一场有去无回的旅行</div>
            <div className="iconfont icon-xingqiu icon-fly " />
          </div>
          <div className="mine">
            {/* <Image  source={require('../../lib/images/first.jpg')} width="50px" height="50px"></Image > */}
            {userInfo ? (
              <div className="mine-content" onTouchStart={this.login}>
                <React.Fragment>
                  <div
                    style={{ backgroundImage: `url("${userphoto} ")` }}
                    className="mine-userphoto"
                  />
                  <div className="login">{nickname}</div>
                  <div onClick={this.onHandleexit}>退出</div>
                </React.Fragment>
                {/* <div className="floatview-song">那些年</div>
              <div className="floatview-singer">胡夏</div> */}
              </div>
            ) : (
              <React.Fragment>
                <Link
                  to={{
                    pathname: "./Login",
                    state: {}
                  }}
                >
                  <div className="iconfont icon-fangchanjingling icon-elf" />
                  <div className="login">点击登陆,开启灵魂旅程</div>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div className="btns">
            <div className="btn-local" onTouchMove={this.move}>
              <div className="iconfont icon-yinle btn-local-icon"> </div>
              本地
            </div>
            <div className="btn-local">
              <div className="iconfont icon-yinle btn-local-icon"> </div>
              本地
            </div>
          </div>
          <div className="bottom-bar">
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              hidden={this.state.hidden}
            >
              <TabBar.Item
                title="首页"
                key="Life"
                icon={
                  <div
                    className="iconfont icon-home mhome"
                    style={{
                      width: "22px",
                      height: "22px"
                    }}
                  />
                }
                selectedIcon={
                  <div
                    className="iconfont icon-home mhome"
                    style={{
                      width: "22px",
                      height: "22px"
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
                }}
                data-seed="logId"
              >
                {this.renderContent("Life")}
              </TabBar.Item>

              <TabBar.Item
                icon={
                  <div
                    className="iconfont icon-user mmine"
                    style={{
                      width: "22px",
                      height: "22px"
                    }}
                  />
                }
                selectedIcon={
                  <div
                    className="iconfont icon-user mmine"
                    style={{
                      width: "22px",
                      height: "22px"
                    }}
                  />
                }
                title="我的"
                key="my"
                selected={this.state.selectedTab === "yellowTab"}
                onPress={() => {
                  this.setState({
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
      </div>
    );
  }
}

export default Mine;
