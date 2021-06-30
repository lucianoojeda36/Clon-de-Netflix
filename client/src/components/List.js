import React from 'react'
import { Text, View, StyleSheet, FlatList, StatusBar, TouchableWithoutFeedback, Image } from 'react-native'
import { useSelector } from 'react-redux'



// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//     },
// ];





// useEffect(() => {
//     dispatch(getOrderById(id))
//   }, [dispatch,id])

// const Item = ({ title }) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>{title}</Text>
//     </View>
// );






function List(props) {


    const pepe = useSelector((state) => state.data)

    function getTwoRows() {
        const array = pepe.slice(0)
        const val = Math.floor(array.length / 2)
        const newArray = array.splice(0, val)
        return [
            array,
            newArray
        ]
    }


    console.log("================data============>", pepe)

    // function replaceHttp (url){
    //     return url.replace(/^http:\/\//i, 'https://');
    // }

    function _renderItem(item) {
        const { navigate } = props.navigation

        // console.log("======item=========>",item.item.image)
        // const item1 = item
        return (
            <TouchableWithoutFeedback
                onPress={() => navigate('Details', { item: item })}
            >
                <Image style={{ width: 120, height: 180 }} source={{ uri: item.item.image }} />


            </TouchableWithoutFeedback>
        )
    }




    // const renderItem = ({ item }) => (
    //     <Item title={item.title} />
    // );


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View>
                <Text style={styles.text} >my List</Text>
                <FlatList
                    horizontal
                    SeparatorComponent={() => <View style={{ width: '5px' }} />}
                    data={getTwoRows()[0]}
                    renderItem={(item) => _renderItem(item)}

                />
            </View>
            <View>
                <Text style={styles.text}>Top picks for you</Text>
                <FlatList
                    horizontal
                    SeparatorComponent={() => <View style={{ width: '5px' }} />}
                    data={getTwoRows()[1]}
                    renderItem={(item) => _renderItem(item)}
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});


export default List