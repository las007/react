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
        return (
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        )
    }
}

export default TestPage;
