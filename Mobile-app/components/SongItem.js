import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { Images, Select } from "../constants";
import Checkbox from 'expo-checkbox';
import { Icon } from ".";

const SongItem = ({ song, navigation, selectMode }) => {
    const handlePress = () => {
        if (song) {
            navigation.navigate('MusicPlayer', { songIds: [song.id] })
        }
    }
    const formatArtists = (artists) => {
        const artistsArray = artists.slice(1, -1).split(',')
        const artistsList = artistsArray.map(artist => artist.trim().slice(1, -1))
        return artistsList.join(', ')
    }

    const handleSelectSong = () => {
        if (selectMode.credentials.includes(song.id)) {
            selectMode.handleChangeCredentials({
                song_ids: selectMode.credentials.filter(
                    (id) => id !== song.id,
                ),
            })
        } else {
            selectMode.handleChangeCredentials({
                song_ids: [...selectMode.credentials, song.id],
            })
        }
    }

    return (
        <Pressable
            onPress={() => selectMode ? handleSelectSong() : handlePress()}
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
            <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={Images.MusicAvt}
            />
            <View style={{ flex: 1, }}>
                <Text
                    numberOfLines={1}
                    style={{ fontWeight: "bold", fontSize: 14, color: "blue" }}
                >
                    {song?.title}
                </Text>
                <Text style={{ marginTop: 4, color: "black" }}>
                    {song && formatArtists(song.artists)}
                </Text>
            </View>
            {selectMode &&
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 7,
                        marginHorizontal: 10,
                    }}
                >
                    <Checkbox
                        value={selectMode.credentials.includes(song.id)}
                        onValueChange={handleSelectSong}
                    />
                </View>
            }
        </Pressable>
    );
};

export default SongItem;

const styles = StyleSheet.create({});
