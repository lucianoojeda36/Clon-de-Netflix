import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    Share,
    Animated
} from 'react-native'


import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import TabsEpisodes from './TabsEpisodes'
import { LinearGradient } from 'expo-linear-gradient'
import { replaceHttps, getYear, removeHtmlTags } from '../lib'

const { width, height } = Dimensions.get('window')






export default function Details (props) {


    const { navigate } = props.navigation

    // const [state, setState] = useState({
    //     measuresTitle: 0,
    //     measuresSeason: 0,
    //     // scrollY: new Animated.Value(0),
    //     currentSeason: 1
    // })
    const [state, setState] = useState({
        currentSeason: 1
    })

    function onShare() {
        Share.share({
            title: 'Designated Survivor',
            url: 'www.youtube.com',
            message: 'Awesome Tv Show'
        }, {
            //android
            dialogTitle: 'Share this awesome content',
            //ios
            excludeActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    function renderThumbnail() {
        const { episodes } = props.route.params.item.item.details
        const localImagePath = require('../images/default-image.png');
        // return episodes[0].image ? { uri: replaceHttps(episodes[0].image.original) } : localImagePath
        return episodes[0].image ? { uri: episodes[0].image.original } : localImagePath
    }


    function getLastSeason() {
        const { params } = props.route
        const { episodes } = params.item.item.details
        return episodes[episodes.length-1].season
    }

    function getSeason(season) {
        setState({
            currentSeason: season
        })
    }


    function getCast() {
        // console.log("lucho", props)
        const { cast } = props.route.params.item.item.details
        const personCast = []
        for (let i = 0; i < 5; i++) {
            personCast.push(cast[i].person.name)
        }
        return personCast.join(", ");
    }

    function resumeDescription(text) {
        const newText = text.split(".")
        return removeHtmlTags(newText[0]) + ". " + removeHtmlTags(newText[1])
    }


    function getNumOfEpisodes() {
        const { episodes } = props.route.params.item.item.details
        return episodes.length
    }

    // console.log("fijate0=========================>", props)



    // const headerNameToggle = state.scrollY.interpolate({
    //     inputRange: [state.measuresTitle, state.measuresTitle + 1],
    //     outputRange: [0, 1]
    // })
    // const headerSeasonHide = state.scrollY.interpolate({
    //     inputRange: [
    //         state.measuresSeason - 1,
    //         state.measuresSeason,
    //         state.measuresSeason + 1
    //     ],
    //     outputRange: [-10, 0, 0]
    // })
    // const headerSeasonToggle = state.scrollY.interpolate({
    //     inputRange: [state.measuresSeason, state.measuresSeason + 1],
    //     outputRange: [0, 1]
    // })








    const { goBack } = props.navigation
    const name = props.route.params.item.item.name


    // console.log("nombreeeeeeeeeeeeee",name)


    const { episodes } = props.route.params.item.item.details


    const { thumbnail, cast, description, year, creator, numOfEpisodes, season } = props.route.params.item.item.details
    // const season= props.route.params.item.item.details.episodes
    // console.log("===========props========>", season)

    return (
        <View style={{ flex: 1 }}>
            <TouchableHighlight
                style={styles.closeButton}
                onPress={() => goBack()}
            >
                <Icon
                    name="close"
                    color="white"
                    size={18}
                />
            </TouchableHighlight>
            <Animated.View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </Animated.View>
            {/* <Animated.View style={[styles.header,
            { opacity: headerSeasonToggle, transform: [{ translateY: 0 }, { translateX: headerSeasonHide }] }]}
            > */}
            <Animated.View style={styles.header}>
                {getLastSeason() == 1 ?
                    <TouchableHighlight>
                        <Text style={styles.headerText}>Season {state.currentSeason}</Text>
                    </TouchableHighlight> :
                    <TouchableHighlight onPress={() => navigate('EpisodesPicker', {
                        getSeason: getSeason,
                        seasons: getLastSeason(),
                        currentSeason: state.currentSeason
                    })}>
                        <View style={styles.headerWithIcon}>
                            <Text style={styles.headerText}>Season {state.currentSeason}</Text>
                            <Icon
                                style={styles.iconDown}
                                name="chevron-down"
                                color="white"
                                size={15}
                            />
                        </View>
                    </TouchableHighlight>}
            </Animated.View>
            <Animated.ScrollView
                scrollEventThrottle={1}
                // onScroll={
                //     Animated.event(
                //         [{ nativeEvent: { contentOffset: { y: state.scrollY } } }],
                //         { useNativeDriver: true }
                //     )
                // } 
                style={styles.container}>
                <ImageBackground
                    style={styles.thumbnail}
                    source={renderThumbnail()}
                >
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback
                            onPress={() => navigate('Video', { name: name })}
                        >
                            <View>
                                <Icon
                                    style={styles.iconPlay}
                                    name="play-circle"
                                    size={90}
                                    color="white"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View
                        // onLayout={({ nativeEvent }) => {
                        //     setState({
                        //         measuresTitle: nativeEvent.layout.y
                        //     })
                        // }}
                    >
                        <LinearGradient colors={['transparent', '#181818', '#181818']}>
                            <Text style={[styles.text, styles.titleShow]}>{name}</Text>
                        </LinearGradient>
                    </View>
                </ImageBackground>
                <View style={styles.descriptionContainer}>
                    <View style={styles.subtitle}>
                        <Text style={[styles.text, styles.subTitleText]}>{getYear(year)}</Text>
                        <Text style={[styles.text, styles.subTitleText]}>{getNumOfEpisodes()}</Text>
                        <Text style={[styles.text, styles.subTitleText]}>{getLastSeason()} Season</Text>
                    </View>
                    {/* <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{description}.</Text>
                    </View> */}
                    <Text style={[styles.text]}>Cast: {getCast()}. </Text>
                    <View style={styles.shareListIcons}>
                        <View style={styles.myListIcon}>
                            <IonIcons
                                style={styles.listIcon}
                                name="md-checkmark"
                                color="grey"
                                size={25}
                            />
                            <Text style={styles.text}>My List</Text>
                        </View>
                        <TouchableHighlight onPress={onShare}>
                            <View style={styles.myShareIcon}>
                                <Icon
                                    style={styles.shareIcon}
                                    name="share-alt"
                                    color="grey"
                                    size={25}
                                />
                                <Text style={styles.text}>Share</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View 
                // onLayout={({ nativeEvent }) => {
                //     setState({
                //         measuresSeason: nativeEvent.layout.y + 10
                //     })
                // }}
                >
                    <TabsEpisodes
                        seasons={season}
                        getSeason={getSeason}
                        navigation={props.navigation}
                        data={episodes}
                        currentSeason={state.currentSeason}
                    />
                    {console.log("aquaman",state.currentSeason)}
                </View>
            </Animated.ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    nameContainer: {
        backgroundColor: 'transparent'
    },
    header: {
        backgroundColor: '#181818',
        paddingVertical: 10,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 10,
        zIndex: 2
    },
    headerText: {
        color: 'white',
        fontSize: 20
    },
    headerWithIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconDown: {
        marginLeft: 5
    },
    titleShow: {
        fontSize: 35,
        paddingLeft: 10,
        marginBottom: 10,
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
    thumbnail: {
        width: width,
        height: 300
    },
    buttonPlay: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    iconPlay: {
        opacity: 0.7,
        backgroundColor: 'transparent'
    },
    descriptionContainer: {
        paddingHorizontal: 20
    },
    subtitle: {
        flexDirection: 'row'
    },
    subTitleText: {
        marginRight: 20
    },
    text: {
        color: '#b3b3b3',
        fontSize: 16
    },
    shareListIcons: {
        flexDirection: 'row',
        marginVertical: 30
    },
    listIcon: {
        height: 25
    },
    shareIcon: {
        height: 25
    },
    myListIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40
    },
    myShareIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        marginVertical: 10
    },
    light: {
        fontWeight: '200'
    }
})
