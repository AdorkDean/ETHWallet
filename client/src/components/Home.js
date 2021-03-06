/*
 * @Author: qugang 
 * @Date: 2018-01-08 00:11:56 
 * @Last Modified by: qugang
 * @Last Modified time: 2018-01-08 12:16:25
 */

import React, { Component } from 'react'
import fetch from './common/fetch'
import * as Ons from "react-onsenui"
import * as ons from "onsenui"
import * as path from './common/path'
var QRCode = require('qrcode.react');

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            address: this.props.address,
            privateKey: "",
            value: ""
        }
    }

    utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    handleprivateKeyChange(e) {
        this.setState({ privateKey: e.target.value });
    }
    handleValueChange(e) {
        this.setState({ value: e.target.value });
    }

    handleClick(e){
        fetch(path.transfer, {
            'ethAddress':this.state.address,
            'ethValue':this.state.value,
            'privateKey': this.state.privateKey
        },window.localStorage.token).then(function (res) {
            if(res.resultCode === "1000"){
                ons.notification.alert('转账成功')
            }
            else{
                ons.notification.alert('转账失败')
            }
        })
    }

    render() {
        return (
            <Ons.Page renderToolbar={() => (
                <Ons.Toolbar modifier="title">
                    <div className='center'>钱包充值</div>
                </Ons.Toolbar>
            )}>
            <div className="red-list">
                <div className="code-tiele">  ETH地址二维码  </div>
                <Ons.List modifier="home">
                        <Ons.ListItem modifier="canvas">
                            <div className="code">
                                <QRCode size={128} value={this.utf16to8(this.props.address)} />
                            </div>
                        </Ons.ListItem>
                        <div className="borderT"><span /></div>

                        <Ons.ListItem modifier="home-message marginTS">
                            您的账号<span className="right">{this.name}</span>
                        </Ons.ListItem>
                        <Ons.ListItem modifier="home-message">
                            ETH地址<span className="right">{this.props.address}</span>
                        </Ons.ListItem>

                        <Ons.ListItem modifier="home-input marginT">
                            <ons-icon icon="ion-ios-person-outline" />
                            <Ons.Input
                                value={this.state.privateKey}
                                onChange={this.handleprivateKeyChange.bind(this)}
                                modifier='underbar'
                                float
                                placeholder='请输入转账私钥' />
                        </Ons.ListItem>
                        <Ons.ListItem modifier="home-input marginB">
                            <ons-icon icon="ion-ios-location-outline" />
                            <Ons.Input
                                value={this.state.value}
                                onChange={this.handleValueChange.bind(this)}
                                modifier='underbar'
                                float
                                placeholder='请输入转账ETH' />
                        </Ons.ListItem>
                    </Ons.List>

                    <Ons.Button modifier="btn-red" onClick={this.handleClick.bind(this)} >充 值</Ons.Button>

            </div>
        </Ons.Page >
        )
    }
}

export default Home