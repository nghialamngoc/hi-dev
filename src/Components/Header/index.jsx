import React from 'react'
import { Avatar } from 'antd';
import logo from '../../Assets/Images/logo.jpg';
import './header.scss';

export default function Header() {
  return (
    <div className="header">
      <div className="header-left flex-center">
        <div className="header-left__logo">
          <img src={logo} alt="logo"></img>
        </div>
        <span className="header-app-name">Hi Dev</span>
      </div>
      <div className="header-right">
        <div className="header-right__user">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={35}/>
        </div>
      </div>
    </div>
  )
}
