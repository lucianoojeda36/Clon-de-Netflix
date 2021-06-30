import React, { Component } from 'react'
import { Navigator } from 'react-native'
import App from './App'
import Search from '.src/components/Search'


class IndexApp extends Component {
    _renderScene(route, navigator) {
        var navigator = { navigator }

        switch (route.ident) {
            case 'App':
                return (
                    <App />
                )
            case 'Search':
                return (
                    <Search />
                )
        }



    }
    render() {
        return (
            <Navigator initialRout={{ ident: 'Search' }} renderSearch={this._renderScene} />
        )
    }

}

export default IndexApp