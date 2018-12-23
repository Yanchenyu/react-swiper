import React, { Component, Fragment } from 'react'

export default class Swiper extends Component {

    constructor (props) {
        super(props);
        console.log(props);
        this.state = {
            imgs: [],
            isLoading: true,    // 初始化loading浮层
        }
    }

    render() {
        return <Fragment>
            {
                this.state.isLoading ? <img width="100%" src={this.props.loadingImg} />
                : (
                    this.props.imgs.map((item, index) => {
                        return <img src={item} key={item + index + '_'} />
                    })
                )
            }
        </Fragment>
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
    loadingImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545539055478&di=37916690314c74bb947310b71b611bfd&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5aa02f4b68d20c9d8ed9caf527e3ba402cb6c4951171-3eWLZC_fw658"
}
