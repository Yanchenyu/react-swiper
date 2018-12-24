import React, { Component } from 'react'

const styles = require('../styles/swiper.css')

let imgContainerDomStyle = null,
    imgsContainerStyle = {},
    startX = 0,     // 触摸事件触发时相对于屏幕的起始位置
    screenWidth = 0,
    leftStartX = 0,     // 触摸事件触发时当前轮播容器的起始位置
    isSingleImg = true // 是否是单张图片

export default class Swiper extends Component {

    constructor(props) {
        super(props);
        isSingleImg = props.imgs.length === 1;
        imgsContainerStyle = {
            width: isSingleImg ? '100%' : (props.imgs.length + 2) * 100 + '%',
        }
        this.factIndex = 0 // 实际当前下标
        this.state = {
            imgs: isSingleImg ? props.imgs : [props.imgs[props.imgs.length - 1], ...props.imgs, props.imgs[0]],
            isLoading: isSingleImg ? false : true, // 初始化loading浮层
            showIndex: 1, // 展示的图片下标（非实际）
        }
        clearInterval(this.interval)
    }

    componentDidMount() {
        if (isSingleImg) {
            return
        }
        imgContainerDomStyle = document.querySelector('#imgsContainer').style;
        screenWidth = window.screen.width;
        this.factIndex += 1;
        imgContainerDomStyle.left = -screenWidth + 'px';
        imgContainerDomStyle.transition = 'all 0.3s';
        this.setState({
            isLoading: false
        })
        this.interval = setInterval(this.animateShow, this.props.intervalTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    // 循环动画
    animateShow = () => {

        let { showIndex, imgs } = this.state;

        if (showIndex < this.props.imgs.length) {
            // 普通情况下
            this.setState({
                showIndex: showIndex + 1
            })

        } else {
            this.setState({
                showIndex: 1
            })
        }

        this.factIndex += 1;

        if (this.factIndex === imgs.length - 1) {
            setTimeout(() => {
                this.factIndex = 1;
                imgContainerDomStyle.transition = '';
                imgContainerDomStyle.left = -screenWidth + 'px';
            }, 300);
        }

        imgContainerDomStyle.transition = 'all 0.3s';
        imgContainerDomStyle.left = -this.factIndex * screenWidth + 'px';

    }

    touchStart = (e) => {
        if (isSingleImg) {
            return
        }
        clearInterval(this.interval);
        imgContainerDomStyle.transition = ''
        startX = e.changedTouches[0].pageX
        leftStartX = parseFloat(imgContainerDomStyle.left)
    }

    touchMove = e => {
        if (isSingleImg) {
            return
        }
        let moveX = e.changedTouches[0].pageX - startX
        let leftNow = leftStartX + moveX
        imgContainerDomStyle.left = leftNow + 'px'
    }

    touchEnd = () => {
        if (isSingleImg) {
            return
        }
        let endX = parseFloat(imgContainerDomStyle.left),
            baseposition = -this.factIndex * screenWidth,
            currentpositionLeft = baseposition - screenWidth / 2,
            currentpositionRight = baseposition + screenWidth / 2;

        imgContainerDomStyle.transition = 'all 0.3s'

        if (endX < currentpositionLeft) {
            // 左滑
            if (this.state.showIndex < this.props.imgs.length) {
                // 普通情况下
                this.setState({
                    showIndex: this.state.showIndex + 1
                })

            } else {
                this.setState({
                    showIndex: 1
                })
            }

            if (this.factIndex === this.props.imgs.length) {
                setTimeout(() => {
                    this.factIndex = 1;
                    imgContainerDomStyle.transition = '';
                    imgContainerDomStyle.left = -screenWidth + 'px';
                }, 300);
            }

            this.factIndex += 1;

        } else if (endX > currentpositionRight) {
            // 右滑
            if (this.state.showIndex === 1) {
                this.setState({
                    showIndex: this.props.imgs.length
                })
            } else {
                this.setState({
                    showIndex: this.state.showIndex - 1
                })
            }

            if (this.factIndex === 1) {
                setTimeout(() => {
                    this.factIndex = this.props.imgs.length;
                    imgContainerDomStyle.transition = '';
                    imgContainerDomStyle.left = -screenWidth * this.factIndex + 'px';
                }, 300);
            }

            this.factIndex -= 1;
        }

        imgContainerDomStyle.left = -this.factIndex * screenWidth + 'px';
        this.interval = setInterval(this.animateShow, this.props.intervalTime);
    }

    render() {

        return <div className={styles.swiperContainer} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
            {this.state.isLoading && <img width="100%" src={this.props.loadingImg} />}
            <div id="imgsContainer" style={imgsContainerStyle} className={styles.imgsContainer}>
                {
                    this.state.imgs.map((item, index) => {
                        return <li key={item + index + '_'} className={styles.imgsItemContainer}>
                            <img width="100%" height="100%" src={item} />
                        </li>
                    })
                }
            </div>
            {
                this.props.imgs.length > 1 ? <span className={styles.imgIndex}>
                    <em style={{ fontStyle: 'normal' }}>{this.state.showIndex}/{this.props.imgs.length}</em>
                </span> : null
            }
        </div>
    }
}

Swiper.defaultProps = {
    imgs: [
        "https://dimg06.c-ctrip.com/images/350b0u000000jj07eE4FC_C_1136_640_Q80.jpg?proc=source/trip",
        "https://dimg08.c-ctrip.com/images/100t0v000000jvt9s9C90_C_1136_640_Q80.jpg?proc=source/trip",
        "https://dimg02.c-ctrip.com/images/10070v000000kcg6eF9E4_C_1136_640_Q80.jpg?proc=source/trip",
        "https://dimg02.c-ctrip.com/images/100d0o000000f4k9093A3_C_1136_640_Q80.jpg?proc=source/trip",
        "https://dimg04.c-ctrip.com/images/350k0z000000mrbno3450_C_1136_640_Q80.jpg?proc=source/trip"
    ],
    loadingImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_15000&sec=1545539055478&di=37916690314c74bb947310b71b611bfd&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5aa02f4b68d20c9d8ed9caf527e3ba402cb6c4951171-3eWLZC_fw658",
    intervalTime: 3000
}
