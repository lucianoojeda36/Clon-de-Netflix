import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList, DrawerItem,
} from '@react-navigation/drawer';
import {
  Text, View, StyleSheet, Button, Alert, Dimensions,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import Header from './src/components/Header'
import List from './src/components/List'
import Slide from './src/components/Slider'
import Menu from './src/components/Menu'
import Search from './src/components/Search';
import { Provider } from 'react-redux'
import {store} from './src/store/store'
import Details from './src/components/Details';
import EpisodesPicker from './src/components/EpisodesPicker';
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config()
axios.defaults.baseURL=process.env.REACT_APP_API || "http://localhost:3000"




function Landing(props) {
  return (
    <View>
      <Header navigation={props.navigation} />
      <Slide />
      <List navigation={props.navigation} />
    </View>
  );
}


const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  return (
    <Drawer.Navigator initialRouteName="Landing" drawerContent={props => <Menu {...props} />}>
      <Drawer.Screen name="Landing" component={Landing} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="Details" navigation={props.navigation} component={Details} />
      <Drawer.Screen name="EpisodesPicker" navigation={props.navigation} component={EpisodesPicker} />
    </Drawer.Navigator>

  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}