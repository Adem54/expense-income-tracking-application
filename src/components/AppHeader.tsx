import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppState } from '../store';
import { IsUserLoggedIn } from '../store/actions/userActions';

 function AppHeader() {
    const {pathname}=useLocation();
     const {data,loading,error}=useSelector((state:AppState)=>state.user)
     console.log("header data: ",data);
     const dispatch=useDispatch();

     useEffect(()=>{
        dispatch(IsUserLoggedIn());
     },[])
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} defaultSelectedKeys={['2']}>
          {data.username ?  ( <React.Fragment>
         <Menu.Item key="/logout"><Link to="/logout">Logout</Link>  </Menu.Item>
          <Menu.Item key="/categories"><Link to="/categories">Categories</Link></Menu.Item>
          <Menu.Item key="/records"><Link to="/records">Records</Link></Menu.Item> 
          </React.Fragment>) : loading ? null :  (<Menu.Item key="/login">
             <Link to="/login">Login</Link> 
              </Menu.Item>) }
         
       
        </Menu>
      </Header>
    )
}

export default AppHeader;
//Simdi buraya biz deneme yapiyoruz

//Evet anliyorum ben seni