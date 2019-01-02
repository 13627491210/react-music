import React, { Component } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { InputItem, Button } from "antd-mobile";
import Input from "antd-mobile/lib/input-item/Input";
import axios from "axios";
import {setItem, getItem} from '../../lib/api/localCache'
class Login extends Component {
    componentDidMount = () => {
    //   var loginurl = "http://localhost:4000/login/cellphone?phone="+;
    }
    onhandleChangeName = (event) => {
        this.setState({
            username:event.target.value
        })
        
    }
    onhandleChangePass = (event) => {
        this.setState({
            userpass:event.target.value
        })
        
    }
    onHandleSubmit = async() => {
        alert("哈哈哈")
        const loginUrl = "http://localhost:3000/login/cellphone?phone="+this.state.username+"&password="+this.state.userpass;
       await axios.get(loginUrl)
       .then((response) => {
        const res = response.data;
           if(response.data.code === "400"){
               alert("请重新登陆！")
           }else{
               console.log("res",res)
            setItem("userInfo",JSON.stringify(res))
            console.log(JSON.parse(getItem("userInfo")) );
               const userphoto = response.data.profile.avatarUrl;
            //    const userid = response.data.account.id;
               const nickname = response.data.profile.nickname;
            console.log("头像1"+userphoto)

        const userid = res.account.id
        var getPlayList = 'http://localhost:3000/user/playlist?uid='+userid; 
         axios.get(getPlayList)
         .then((responsePlaylist) => {
             const playlist  = responsePlaylist.data;
           const playlistid  = responsePlaylist.data.playlist[0].id;
           console.log("歌单"+responsePlaylist.data.playlist[0].id);
           // const res = response.data;
           
           var getMusicURL = 'http://localhost:3000/playlist/detail?id='+playlistid
           axios.get(getMusicURL)
           .then((response) => {
             // const playlistid  = response.data.playlist[0].id;
             const musicid = response.data.playlist.tracks[0].id
             console.log("歌单"+response.data.playlist.tracks[0].id);
             // const res = response.data;
             
             var getMusicPlay = 'http://localhost:3000/song/url?id='+musicid
             axios.get(getMusicPlay)
             .then((response) => {
               // const playlistid  = response.data.playlist[0].id;
               const music = response.data.data[0].url
               console.log("歌曲"+response.data.data[0].url);
               this.setState({
                 music:music
               })
               console.log("音乐",this.state.music)
               // const res = response.data;
               
               // var getMusicURL = 'http://localhost:3000/playlist/detail?id='+playlistid
       
             })
           })
           this.props.history.push({ pathname: "/Home", state: { userphoto,userid,nickname,playlist} });
         })
        }
    })
    }
    state={
        username:"",
        userpass:"",
    }
  render() {
      const {username,userpass} = this.state;
    return(
        <div className="login-bg">
        {/* <div className="list-cover-head">
        <Link to={{
             pathname:"./Mine"
        }}>
            <div
              className="iconfont icon-fanhui icon-back"
            />
            </Link>
          <div className="list-cover-title">推荐</div>
          <div className="iconfont icon-shenglve icon-operations" /> */}

        {/* </div> */}
        <div className="login-form">
            {/* <div className="login-name"> */}
               <input className="login-name" placeholder="请输入账号" value={username} onChange={this.onhandleChangeName}></input>
               <input className="login-pass" placeholder="请输入密码" value={userpass} onChange={this.onhandleChangePass}></input>
               <Button type="submit" className="login-submit" onClick={this.onHandleSubmit}>提交</Button>
            {/* </div> */}
        </div>
        </div>
        
    )
     
  }
}

export default Login;
