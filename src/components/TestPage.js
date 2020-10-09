import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Carousel } from "antd";
import Slider from "react-slick";

class TestPage extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('log test..', this.props);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log test page...');
    }

    clickEvent = () => {
      console.log('log click event..', this.props);
      this.props.history.push("/commentPage");
    };
    onChange(a, b, c) {
        console.log(a, b, c);
    }
    render() {
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
        };
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        var index=1,timer;
        function init(){
            // eventBind();
            autoPlay();
        }
        init();
        function autoPlay(){
            timer =setInterval(function () {
                animation(-600);
                dotIndex(true);
            },1000)
        }
        function stopAutoPlay() {
            clearInterval(timer);
        }
        function dotIndex(add){
            if(add){
                index++;
            }
            else{
                index--;
            }
            if(index>5){
                index = 1;
            }
            if(index<1){
                index = 5;
            }
            dotActive();
        }
        function dotActive() {
            var dots = document.getElementsByClassName("dot");
            var len = dots.length;
            for(var i=0 ;i<len ;i++){
                dots[i].className = "dot";
            }

            for(var i=0;i<len;i++){
                /*此处可以不用parseInt，当不用全等时*/
                if(index === parseInt(dots[i].getAttribute("index"))){
                    dots[i].className = "dot active";
                }
            }
        }
        function eventBind(){
            /*点的点击事件*/
            var dots = document.getElementsByClassName("dot");
            var len = dots.length;
            for(var i=0;i<len;i++){
                (function(j){
                    dots[j].onclick = function(e){
                        var ind = parseInt(dots[j].getAttribute("index"));
                        animation((index - ind)*(-600));/*显示点击的图片*/
                        index = ind;
                        dotActive();
                    }
                })(i)
            }
            /*容器的hover事件*/
            var con = document.getElementsByClassName("container")[0];
            /*鼠标移动到容器上时，停止制动滑动，离开时继续滚动*/
            con.onmouseover = function (e) {
                stopAutoPlay();
            }
            con.onmouseout =function(e){
                autoPlay();
            }
            /*箭头事件的绑定*/
            var pre = document.getElementsByClassName("pre")[0];
            var next = document.getElementsByClassName("next")[0];
            pre.onclick = function (e) {
                dotIndex(false);
                animation(600);
            }
            next.onclick = function (e) {
                dotIndex(true);
                animation(-600);
            }
        }
        function animation(offset){
            var lists = document.getElementsByClassName("list")[0];
            var left = parseInt(lists.style.left.slice(0,lists.style.left.indexOf("p"))) + offset;
            if(left<-3000){
                lists.style.left = "-600px";
            }
            else if(left>-600){
                lists.style.left = "-3000px";
            }
            else{
                lists.style.left = left+"px";
            }
        }
        return (
            <div className="container">
                <div className="list" style=" left:-600px;">
                    <img src={[require("../static/back.jpg")]} />
                    <img src={[require("../static/back.jpg")]} />
                    <img src={[require("../static/back.jpg")]} />
                    <img src={[require("../static/back.jpg")]} />
                    <img src={[require("../static/back.jpg")]} />
                </div>
                <ul className="dots">
                    <li index="1" className="active dot">

                    </li>
                    <li index="2" className="dot">

                    </li>
                    <li index="3" class="dot">

                    </li>
                    <li index="4" class="dot">

                    </li>
                    <li index="5" class="dot">

                    </li>
                </ul>
                {/*<div className="pre"><</div>*/}
                <div className="next">></div>
            </div>
        )
    }
}

export default TestPage;
