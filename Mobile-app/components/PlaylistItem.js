import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

const PlaylistItem = ({ playlist, navigation }) => {
    const handlePress = () => {
        if (playlist) {
            navigation.navigate('PlaylistDetail', { playlistId: playlist.id })
        }
    }

    return (
        <Pressable
            style={styles.itemContainer}
            onPress={handlePress}
        >
            <View style={{ flex: 1 }}>
                <Text
                    numberOfLines={1}
                    style={styles.itemTitle}
                >
                    {playlist?.title}
                </Text>
                <Text style={styles.itemDescription}>
                    {playlist?.description}
                </Text>
            </View>
            <Text style={styles.itemTitle}>
                Songs: {playlist?.Songs.length}
            </Text>
        </Pressable>
    );
};

export default PlaylistItem;

const styles = StyleSheet.create({
    itemContainer: { flexDirection: "row", alignItems: "center", padding: 10, justifyContent: 'space-evenly' },
    itemTitle: { fontWeight: "bold", fontSize: 14, color: "blue" },
    itemDescription: { marginTop: 4, fontSize: 14, color: "black" }
});
