import React, { useCallback, useState } from 'react'
import { Avatar, Drawer } from 'antd';
import logo from '../../Assets/Images/logo.jpg';
import { NavLink, withRouter  } from 'react-router-dom';
import './header.scss';

const Header = function ({ history }) {
  const [visible, setVisible] = useState(false);
  const showDrawer = useCallback(
    () => {
      setVisible(true);
    },
    [],
  )
  const onClose = () => {
    setVisible(false);
  };
  history.listen((location, action) => {
    setVisible(false);
  })
  return (
    <div className="header">
      <div className="header-left flex-center">
        <div className="header-left__logo" onClick={showDrawer}>
          <img src={logo} alt="logo"></img>
        </div>
        <span className="header-app-name">Hi Dev</span>
      </div>
      <div className="header-right">
        <div className="header-right__user">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={35} />
        </div>
      </div>
      <Drawer
        title="Hi Dev 🥳"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="app-menu"
      >
        <ul>
          <li className="not-list-style">
            <NavLink to="/todo" className="menu-link" activeClassName="menu-link-active"><p>TODO List</p></NavLink>
          </li>
        </ul>
        <ul>
          <li className="not-list-style">
            <NavLink to="/blog" className="menu-link" activeClassName="menu-link-active"><p>Blog</p></NavLink>
          </li>
        </ul>
      </Drawer>
    </div>
  )
}

export default withRouter(Header);