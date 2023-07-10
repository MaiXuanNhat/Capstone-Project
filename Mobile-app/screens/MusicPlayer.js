import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Block, Text, theme } from "galio-framework";
import { Slider } from "@miblanchard/react-native-slider";

import { Button, Icon } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import songApi from '../api/songApi';
import historyApi from "../api/historyApi";
import { Audio } from 'expo-av';
import { BASE_API_URL } from "../api/axiosClient";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function MusicPlayer(props) {
    const {
        route,
        navigation,
    } = props

    const isFocused = useIsFocused();
    const { songIds } = route.params
    const [songs, setSongs] = useState(null)
    const [audio, setAudio] = useState()
    const [currentSong, setCurrentSong] = useState()
    const [isPlaying, setIsPlaying] = useState(true)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isLiked, setIsLiked] = useState(true)

    useEffect(() => {
        if (!isFocused && audio) {
            handleUnloadAudio()
        }
    }, [isFocused])

    const handleUnloadAudio = async () => {
        if (audio) {
            await audio.unloadAsync();
            setAudio(null);
            setIsPlaying(true);
            setDuration(0);

            // Update history
            await historyApi.addHistory(
                {
                    songId: currentSong.id,
                    duration: duration,
                }
            )
        }
    }

    const formatArtists = (artists) => {
        const artistsArray = artists.slice(1, -1).split(',')
        const artistsList = artistsArray.map(artist => artist.trim().slice(1, -1))
        return artistsList.join(', ')
    }
    const formatTime = (duration) => {
        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handleSliderChange = async (value) => {
        if (audio) {
            audio.setPositionAsync(Number.parseInt(value[0]))
        }
    };
    const handleVolumeChange = async (value) => {
        if (audio) {
            await audio.setVolumeAsync(value[0]);
        }

    }
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await songApi.getListById({
                    song_ids: songIds
                })
                
                if (response.status === 200 && response.data.length > 0) {
                    setSongs(response.data)
                    setCurrentSong(response.data[0])
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isFocused && songIds) fetchSongs()
    }, [songIds, isFocused])

    useEffect(() => {
        async function requestPermission() {
            const audioPermission = Audio.getPermissionsAsync()
            if (!audioPermission.granted) {
                return await Audio.requestPermissionsAsync()
            }
        }
        requestPermission()
    }, [])

    useEffect(() => {
        async function loadAudio() {
            try {
                const audio = new Audio.Sound();
                await audio.loadAsync({ uri: (BASE_API_URL + currentSong.audio_url).replaceAll(" ", "%20")}, { shouldPlay: true });
                await audio.setPositionAsync(0);
                audio.setOnPlaybackStatusUpdate((status) => {
                    setDuration(status.positionMillis)
                    setVolume(status.volume)
                })
                setAudio(audio);
            } catch (error) {
                console.log(error);
            }
        }
        if (currentSong) loadAudio()
    }, [currentSong])

    const handlePressPlayButton = async () => {
        if (audio) {
            const audioStatus = await audio.getStatusAsync();
            if (audioStatus.isPlaying) {
                setIsPlaying(false);
                await audio.pauseAsync();
            } else {
                setIsPlaying(true);
                await audio.playAsync();
            }
        }
    }

    const handleChangeSong = async (step) => {
        await handleUnloadAudio()
        
        const currentSongIndex = songs.indexOf(currentSong)

        if (currentSongIndex + step >= 0 && currentSongIndex + step < songs.length) {
            setCurrentSong(songs[currentSongIndex + step])
        }
    }

    return (
        <Block flex style={styles.profile}>
            <Block flex>
                <ImageBackground
                    source={Images.Splash}
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
                                    source={Images.MusicAvt}
                                    style={styles.avatar}
                                />
                            </Block>
                            <Block flex>
                                <Block middle style={styles.nameInfo}>
                                    <Text bold size={28} color="#32325D">
                                        {currentSong?.title}
                                    </Text>
                                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                                        {currentSong && formatArtists(currentSong.artists)}
                                    </Text>
                                </Block>
                            </Block>
                            <Block>
                                <Slider
                                    style={{ width: "100%", height: 40, marginTop: 30 }}
                                    minimumValue={0}
                                    maximumValue={currentSong?.duration}
                                    value={duration}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="#cccccc"
                                    onValueChange={handleSliderChange}
                                />
                            </Block>
                            <Block flex row space="between">
                                <Text>{formatTime(duration)}</Text>
                                <Text>{"-" + formatTime(currentSong?.duration - duration)}</Text>
                            </Block>
                            <Block row center space="between" style={{ marginTop: 20 }}>
                                <Block flex middle right>
                                    <Button
                                        onlyIcon icon="step-backward"
                                        iconFamily="Font-Awesome"
                                        iconSize={20} color="default"
                                        iconColor="white" style={{ width: 45, height: 45 }}
                                        onPress={() => handleChangeSong(-1)}
                                    />
                                </Block>
                                <Block flex middle center>
                                    <Button
                                        onPress={handlePressPlayButton}
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
                                        iconColor="white" style={{ width: 45, height: 45 }}
                                        onPress={() => handleChangeSong(1)}
                                    />
                                </Block>
                            </Block>
                            <Block flex style={{ marginTop: 20 }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={1}
                                    value={volume}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="#cccccc"
                                    onValueChange={handleVolumeChange}
                                />
                                <Block row space="between">
                                    <Icon name="volume-off" family="Font-Awesome" size={20} />
                                    <Icon name="volume-up" family="Font-Awesome" size={20} />
                                </Block>
                            </Block>
                            <Block row center space="between" style={{ marginTop: 10 }}>
                                <Block flex left>
                                    <Button
                                        onPress={() => setIsLiked((prev) => !prev)}
                                        onlyIcon icon={isLiked ? "heart" : "hearto"}
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
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        borderRadius: 10,
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