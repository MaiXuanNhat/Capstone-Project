import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { Images } from "../constants";
import { Icon } from ".";

const SongItem = ({ song, navigation }) => {
    const handlePress = () => {
        if (song) {
            navigation.navigate('MusicPlayer', { songId: song.id })
        }
    }
    return (
        <Pressable
            onPress={handlePress}
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
            <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: "data:image/png;base64,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" }}
            />
            <View style={{ flex: 1, }}>
                <Text
                    numberOfLines={1}
                    style={{ fontWeight: "bold", fontSize: 14, color: "blue" }}
                >
                    {song?.title}
                </Text>
                <Text style={{ marginTop: 4, color: "black" }}>
                    {song?.artists}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginHorizontal: 10,
                }}
            >
                <Icon
                  size={20}
                  name="clear"
                  family="MaterialIcons"
                />                
            </View>
        </Pressable>
    );
};

export default SongItem;

const styles = StyleSheet.create({});
