import React, { useEffect, useState, useCallback } from 'react'
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    RefreshControl,
    Text,
} from 'react-native'
import { Block, theme } from 'galio-framework';

import { Icon, Input, SongItem, Button } from '../components';

import { Images, argonTheme } from '../constants'
const { width, height } = Dimensions.get('screen')
import { HeaderHeight } from '../constants/utils';
import useAuth from '../hooks/useAuth';
import playlistApi from '../api/playListApi';

export default function PlaylistDetail(props) {
    const { route, navigation } = props
    const { playlistId } = route.params
    const [playlist, setPlaylist] = useState(null)
    const { isLoading, setIsLoading } = useAuth()
    const [refresh, forceRefresh] = useState()
    const [songs, setSongs] = useState(null)

    useEffect(() => {
        async function fetchPlaylistData() {
            setIsLoading(true)
            try {
                const response = await playlistApi.getOneById(playlistId)
                setPlaylist(response.data)
                setSongs(response.data.Songs)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                alert(error.response.data.message)
            }
        }
        fetchPlaylistData()
    }, [refresh, playlistId])

    return (
        <Block flex center style={styles.home}>
            <StatusBar hidden />
            <ScrollView>
                <Block style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Title:</Text>
                    <Input
                        editable={false}
                        right
                        color="black"
                        style={styles.search}
                        placeholder={playlist?.title}
                        placeholderTextColor={'#000000'}
                        iconContent={<Block />}
                    />
                    <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Description:</Text>
                    <Input
                        editable={false}
                        right
                        color="black"
                        style={styles.search}
                        placeholder={playlist?.description}
                        placeholderTextColor={'#000000'}
                        iconContent={<Block />}
                    />
                </Block>

                <Block
                    safe
                    flex
                    style={{ width, zIndex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}
                >
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 16, marginTop: 10, marginBottom: 5, fontWeight: "bold", marginLeft: 10 }}
                    >
                        Songs
                    </Text>
                    <Block style={{ height: 500 }}>
                        <ScrollView
                            nestedScrollEnabled={true}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={() => forceRefresh((prev) => !prev)}
                                />
                            }
                        >
                            <Block safe flex>
                                {songs &&
                                    songs.map((song) => {
                                        return (
                                            <SongItem
                                                key={`song-${song.id}`}
                                                song={song}
                                                navigation={navigation}
                                            />
                                        )
                                    })}
                            </Block>
                        </ScrollView>
                    </Block>
                </Block>
                <Button
                    small center color="success"
                    textStyle={{ color: 'white', fontSize: 16, fontWeight: '700' }}
                    style={{
                        width: 'auto',
                        height: 50,
                        paddingHorizontal: theme.SIZES.BASE,
                        paddingVertical: 10,
                    }}
                    onPress={() => navigation.navigate('MusicPlayer', { songIds: songs.map(song => song.id) })}
                >
                    Play
                </Button>
            </ScrollView>
        </Block>
    )
}


const styles = StyleSheet.create({
    home: {
        width: width,
    },
    articles: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
    },
});


