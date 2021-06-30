import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Alert,
    Button,
    requireNativeComponent
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
const title = "nsdlknsknkdsgnksndksdk"

const Header = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()} >
                <Icon
                    name="bars"
                    color="white"
                    size={25}
                />
            </TouchableWithoutFeedback>
            <Image style={styles.logo} source={require('../images/Netflix-logo.png')} />
            <Icon
                onPress={() => navigation.navigate('Search')}
                name="search"
                color="white"
                size={25}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    logo: {
        width: 120,
        height: 40
    }
})

export default Header