/**
 * Created by 96004 on 2017/8/8.
 */
import React, {Component} from 'react';
import {ajax} from '../../util/index';
let port = require('../../../mock/port');
import {Carousel,WhiteSpace,NavBar,Card,List,Radio,Stepper,Button,Flex} from 'antd-mobile';
const RadioItem=Radio.RadioItem;
export default class GoodsDetail extends Component {
    constructor() {
        super();
        this.state = {
            goods: {
                images:[],
                name: '',
                description: '',
                standard: [],
                avatar: ''
            },
            value:0,
            val:0
        }
    }

    componentWillMount() {
        ajax({
            url: `http://localhost:${port}/detail/123`,
            method: 'GET'
        }).then((res) => {
            console.log(res.data);
            this.setState({goods:res.data})
        })
    }
    onChange = (value) => {
        this.setState({
            value,
        });
    };
    onChangeVal = (val) => {
        this.setState({
            val,
        });
    };
    format=(ary)=>{
        let aryData=[];
        ary.forEach((item,index)=>{
            aryData.push({value:index,label:item})
        })
        return aryData;
    }
    render() {
        let {value} = this.state;
        let {images,avatar,name,description,standard} = this.state.goods;
        return (
            <div>
                <NavBar mode="dark" className="head">
                    商品详情
                </NavBar>
                <Carousel
                    className="my-carousel"
                    autoplay={false}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                >
                    {images.map(ii => (
                        <a href="#" key={ii} style={{height:200}}>
                            <img width="100%"
                                 src={ii}
                                 onLoad={() => {
                                     window.dispatchEvent(new Event('resize'));
                                     this.setState({
                                         initialHeight: null,
                                     });
                                 }}
                            />
                        </a>
                    ))}
                </Carousel>
                <WhiteSpace/>
                <Card full>
                    <Card.Header
                        title={name}
                        thumb={avatar}
                    />
                    <Card.Body>
                        <div>{description}</div>
                    </Card.Body>
                    <Card.Footer content="" extra={<div>商品具体以实物为准</div>} />
                </Card>
                <WhiteSpace/>
                <List renderHeader={() => '请选择型号'}>
                    {this.format(standard).map(i => (
                        <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>
                <WhiteSpace/>
                <list>
                    <List.Item
                        className="select"
                        wrap
                        extra={
                            <Stepper
                                style={{ width: '100%', minWidth: '2rem' }}
                                showNumber
                                max={10}
                                min={1}
                                value={this.state.val}
                                onChange={this.onChangeVal}
                                useTouch={false}
                            />
                        }
                    >
                        请选择商品数量
                    </List.Item>
                </list>
                <Flex className="footer" justify="end">
                    <span className="car">加入购物车</span>
                    <span className="buy">立即购买</span>
                </Flex>
            </div>
        )
    }
}
import './GoodsDetail.less'