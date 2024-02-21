import React from "react";
import {View, Text, StyleSheet, Image, Linking,TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const twitch = <Icon name={'twitch'} size={30} color={'purple'}/>
const youtube = <Icon name={'youtube'} size={30} color={'red'}/>
const snapchat = <Icon name={'snapchat'} size={30} color={'black'}/>
const pinterest = <Icon name={'pinterest'} size={30} color={'red'}/>
const kwai = <Icon name={'video-camera'} size={30} color={'orange'}/>
const kwaiIcon = <Icon name={'custom-kwai-icon'} size={30} color={'orange'} />;
const ProfileCard = () => {
    const user = {
        avatar: "../../../assets/portada_me.jpg",
        coverPhoto: "../../../assets/me_photo.jpg",
        name: "Stalin Gagñay"
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/portada_me.jpg')} style={styles.coverPhoto} />
            <View style={styles.avatarContainer}>
                <Image source={require('../../../assets/me_photo.jpg')} style={styles.avatar} />
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View> 
            <View style={styles.buttonContainer}>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.twitch.tv/')
                }}>
                    {twitch}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.youtube.com/')
                }}>
                    {youtube}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.snapchat.com/')
                }}>
                    {snapchat}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.pinterest.com/')}>
                    {pinterest}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.kwai.com')}>
                    {kwai}
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center' //flex y grid
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -75
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: 'black'
    },
    name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '60%',
        justifyContent: 'space-between'
    }
});
export default ProfileCard