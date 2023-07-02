import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    TouchableOpacity
} from "react-native";
import { Block, Text, theme, Slider } from "galio-framework";

import { Button, Icon } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { withNavigation } from '@react-navigation/compat'
import songApi from '../api/songApi';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function MusicPlayer(props) {
    const {
        route,
        navigation,
    } = props

    const { songId } = route.params
    const [song, setSong] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [duration, setDuration] = useState(0)

    const getSong = async () => {
        try {
            const response = await songApi.getOneById(songId)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (songId) getSong()
    }, [songId])

    return (

        <Block flex style={styles.profile}>
            <Block flex>
                <ImageBackground
                    source={Images.ProfileBackground}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width, marginTop: '15%' }}
                    >
                        <Block flex style={styles.profileCard}>
                            <Block middle style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: "https://static.wikia.nocookie.net/taylor-swift/images/c/cb/Taylor%27s_Version.jpg/revision/latest?cb=20220327093043" }}
                                    style={styles.avatar}
                                />
                            </Block>
                            <Block flex>
                                <Block middle style={styles.nameInfo}>
                                    <Text bold size={28} color="#32325D">
                                        You Belong With Me
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                                        Taylor Swift
                                    </Text>
                                </Block>
                            </Block>
                            <Block >
                                <Slider
                                    style={{ width: "100%", height: 40, marginTop: 30 }}
                                    minimumValue={0}
                                    maximumValue={1}
                                    value={duration}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="#cccccc"
                                //onValueChange={() => setDuration((prev) => value)}
                                />
                            </Block>
                            <Block flex row space="between">
                                <Text>1:00</Text>
                                <Text>- 2:51</Text>
                            </Block>
                            <Block row center space="between" style={{ marginTop: 20 }}>
                                <Block flex middle right>
                                    <Button
                                        onlyIcon icon="step-backward"
                                        iconFamily="Font-Awesome"
                                        iconSize={20} color="default"
                                        iconColor="white" style={{ width: 45, height: 45 }}>
                                    </Button>
                                </Block>
                                <Block flex middle center>
                                    <Button
                                        onPress={() => setIsPlaying((prev) => !prev)}
                                        onlyIcon icon={isPlaying ? "pause" : "play"}
                                        iconFamily="Font-Awesome"
                                        iconSize={20} color="default"
                                        iconColor="white" style={{ width: 45, height: 45 }}>
                                    </Button>
                                </Block>
                                <Block flex middle left>
                                    <Button
                                        onlyIcon icon="step-forward"
                                        iconFamily="Font-Awesome"
                                        iconSize={20} color="default"
                                        iconColor="white" style={{ width: 45, height: 45 }}>
                                    </Button>
                                </Block>
                            </Block>
                            <Block flex style={{ marginTop: 20 }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={1}
                                    value={1}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="#cccccc"
                                //onValueChange={this.handleVolumeChange}
                                />
                                <Block row space="between">
                                    <Icon name="volume-off" family="Font-Awesome" size={20} />
                                    <Icon name="volume-up" family="Font-Awesome" size={20} />
                                </Block>
                            </Block>
                            <Block row center space="between" style={{ marginTop: 10 }}>
                                <Block flex left>
                                    <Button
                                        onlyIcon icon="heart"
                                        iconFamily="AntDesign"
                                        iconSize={20} color="default"
                                        iconColor="white" style={{ width: 45, height: 45 }}>
                                    </Button>
                                </Block>
                                <Block flex right>
                                    <Button
                                        onlyIcon icon="list-ul"
                                        iconFamily="Font-Awesome"
                                        iconSize={20} color="default"
                                        iconColor="white" style={{ width: 45, height: 45 }}>
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    </ScrollView>
                </ImageBackground>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1,
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
        width: width,
        height: height
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2
    },
    tinyPlayer: {
        // position: 'absolute',
        bottom: 0,
        marginTop: 100,
    },
    info: {
        paddingHorizontal: 40
    },
    avatarContainer: {
        position: "relative",
        marginTop: -80,
        alignItems: "center"
    },
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 10,
        borderWidth: 0
    },
    tinyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 0
    },
    nameInfo: {
        marginTop: 35
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure
    }
});