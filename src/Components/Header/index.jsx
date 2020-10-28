import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Drawer, Modal } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { setUserLogin } from '../../stores/Action/userAction';
import logo from '../../assets/Images/logo.jpg';
import FireBase from '../../firebase';
import './header.scss';

const Header = function ({ history }) {
  const [visible, setVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
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

  const signIn = useCallback(() => {
    FireBase.loginWithGoogle(userLoginData => {
      if (userLoginData != null) {
        const { displayName, email } = userLoginData;
        const user = {
          displayName,
          email,
          isLogin: true
        }
        dispatch(setUserLogin(user))
        localStorage.setItem('userLogin', JSON.stringify(user));
        setLoginModalVisible(false);
      }
    });
  }, [dispatch])

  const signOut = useCallback(() => {
    FireBase.logoutWithGoogle(() => {
      const user = {
        displayName: '',
        email: '',
        isLogin: false
      }
      dispatch(setUserLogin(user))
      localStorage.setItem('userLogin', null);
    })
  }, [dispatch])

  return (
    <div className="header">
      <div className="header-left flex-center">
        <div className="header-left__logo" onClick={showDrawer}>
          <img src={logo} alt="logo"></img>
        </div>
        <span className="header-app-name">Hi Dev</span>
      </div>
      <div className="header-right flex-center">
        {userLogin.isLogin === false ?
          (<span className="header-signin" onClick={() => setLoginModalVisible(true)}>Sign in</span>) :
          (<span className="header-signin" onClick={signOut}>Sign out</span>)
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
            <NavLink to="/articles" className="menu-link" activeClassName="menu-link-active"><p>Blog</p></NavLink>
          </li>
        </ul>
      </Drawer>
      <Modal
        visible={loginModalVisible}
        footer={null}
        width="600px"
        onOk={() => setLoginModalVisible(false)}
        onCancel={() => setLoginModalVisible(false)}
        className="signin-modal"
      >
        <h2 className="signin-modal-header">Welcome back.</h2>
        <span className="signin-type" onClick={signIn}>
          <svg width="25" height="25" class="yd ff s"><g fill="none" fill-rule="evenodd"><path d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z" fill="#4285F4"></path><path d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z" fill="#34A853"></path><path d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z" fill="#FBBC05"></path><path d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z" fill="#EA4335"></path></g></svg>
          <span>Sign in with google</span>
        </span>
        <span className="signin-type">
          <svg width="25" height="25" fill="#3B5998" class="yd ff s"><path d="M20.3 4H4.7a.7.7 0 0 0-.7.7v15.6c0 .38.32.7.7.7h8.33v-6.38h-2.12v-2.65h2.12V9.84c0-2.2 1.4-3.27 3.35-3.27.94 0 1.75.07 1.98.1v2.3H17c-1.06 0-1.31.5-1.31 1.24v1.76h2.65l-.53 2.65H15.7l.04 6.38h4.56a.7.7 0 0 0 .71-.7V4.7a.7.7 0 0 0-.7-.7" fill-rule="evenodd"></path></svg>
          <span>Sign in with google</span>
        </span>
        <span className="signin-footer">Click “Sign In”</span>
      </Modal>
    </div>
  )
}

export default withRouter(Header);