import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Drawer } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../Assets/Images/logo.jpg';
import FireBase from '../../firebase';
import { setUserLogin } from '../../Store/Action/userAction';
import './header.scss';

const Header = function ({ history }) {
  const [visible, setVisible] = useState(false);
  const userLogin = useSelector(state => state.userLogin.userLoginData);
  console.log(userLogin);
  const dispatch = useDispatch();
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

  const signIn = () => {
    FireBase.loginWithGoogle( userLoginData => {
      if (userLoginData != null) {
        const { displayName, email } = userLoginData;
        const user = {
          displayName,
          email,
          isLogin: true
        }
        dispatch(setUserLogin(user))
        localStorage.setItem('userLogin', JSON.stringify(user));
      }
    });
  }

  return (
    <div className="header">
      <div className="header-left flex-center">
        <div className="header-left__logo" onClick={showDrawer}>
          <img src={logo} alt="logo"></img>
        </div>
        <span className="header-app-name">Hi Dev</span>
      </div>
      <div className="header-right flex-center">
        { userLogin.isLogin === false ?
          (<span className="header-signin" onClick={signIn}>Sign in</span>) :
          (<span className="header-signin" onClick={signIn}>Sign out</span>)
        }
        {
          userLogin.isLogin &&
          <div className="header-right__user">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={35} />
          </div>
        }
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