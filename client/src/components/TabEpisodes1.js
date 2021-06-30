import React, { Component, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import Episodes from './Episodes'
import Trailers from './Trailers'

export default function TabsEpisodes1(props) {
//     const [state, setState] = useState({
//         index: 0,
//         routes: [
//             { key: '1', title: 'Episodes' },
//             { key: '2', title: 'Trailers & More' }
//         ]
//     })

//     function _handleChangeTab(index) {
//         setState({ index })
//     }
//     function _renderHeader(props) {
//         return <TabBar {...props} />
//     }
//     function _renderScene() {
//         console.log("que trae aca===========>", props)
//         // switch (props.route.params.item.index) {
//         //     // case '1':
//         //     //     return <Episodes
//         //     //         seasons={props.seasons}
//         //     //         getSeason={props.getSeason}
//         //     //         navigation={props.navigation}
//         //     //         currentSeason={props.currentSeason}
//         //     //         episodes={props.data}
//         //     //     />
//         //     case '2':
//         //         return <Trailers />
//         //     default:
//         //         return null
//         // }

//         return (

//             <Episodes
//                 seasons={props.seasons}
//                 getSeason={props.getSeason}
//                 navigation={props.navigation}
//                 currentSeason={props.currentSeason}
//                 episodes={props.data}
//             />

//         )
//     }


//     return (
//         <TabViewAnimated
//             style={styles.container}
//             // navigationState={state}
//             renderScene={_renderScene()}
//             renderHeader={_renderHeader()}
//             onRequestChangeTab={_handleChangeTab()}
//         />
//     )

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         borderTopWidth: 2,
//         borderColor: 'black'
//     },
// })
    return(
        <View>
            {console.log("=============eppe============>",props.seasons)}
        <Text>fdh kldjglkjgrlkfedjlkgdtrklñ</Text>
       </View>

    )

}
