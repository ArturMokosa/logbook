import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import MainWindow from "./MainWindow";
import SettingsPanel from './SettingsPanel/SettingsPanel';
import LoginPage from './LoginPage';
import { LS_LOGIN_INFO, fetchUserInfo } from '../reducers/LoginReducer';

const styles = {
  container: {
    width: '100%'
  }
}

const mapStateToProps = store => {
  return {
    logged: store.login.logged,
  }
}

@connect(store => mapStateToProps(store))
export default class AppProvider extends React.Component {

  async componentWillMount() {
    try {
      const LoginInfo = JSON.parse(localStorage.getItem(LS_LOGIN_INFO));
      if (LoginInfo) {
        await this.props.dispatch(fetchUserInfo(LoginInfo.email, LoginInfo.login));
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { logged } = this.props;
    if (logged) {
      return (
        <MainApp>
          <SettingsPanel />
          <MainWindow />
        </MainApp>
      );
    } else {
      return (
        <MainApp>
          <LoginPage />
        </MainApp>
      );
    }
  }
}

function MainApp(props) {
  return (
    <div style={styles.container}>
      <NavigationBar />
      {props.children}
    </div>
  );
}