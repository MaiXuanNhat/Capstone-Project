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
import songApi from '../api/songApi';
import recommendApi from '../api/recommendApi';
import playlistApi from '../api/playListApi';

export default function AddPlaylist(props) {
  const { navigation } = props

  const { isLoading, setIsLoading } = useAuth()
  const [refresh, forceRefresh] = useState()
  const [songs, setSongs] = useState(null)
  const [recommendSongs, setRecommendSongs] = useState()
  const [selectedRecommendSongs, setSelectedRecommendSongs] = useState({
    song_ids: []
  })
  const [credentials, setCredentials] = useState({
    title: '',
    description: '',
    song_ids: [],
  })
  
  const defaultParams = {
    limit: 10,
    page: 1,
    txt_search: '',
  }
  const [params, setParams] = useState(defaultParams)

  useEffect(() => {
    async function fetchSongsData() {
      setIsLoading(true)
      try {
        const response = await songApi.getListByParams(params)
        setSongs(response.data.rows)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        alert(error.response.data.message)
      }
    }
    fetchSongsData()
  }, [refresh, params])

  useEffect(() => {
    async function fetchRecommendSongs() {
      try {
        const response = await recommendApi.getSongRecommendations({
          query_song_ids: credentials.song_ids,
          limit: 10,
        })
        setRecommendSongs(response.data)
      } catch (error) {
        setIsLoading(false)
        alert(error.response.data.message)
      }
    }

    if (credentials.song_ids && credentials.song_ids.length > 0) {
      fetchRecommendSongs()
    }
  }, [credentials])

  const handleChangeCredentials = useCallback(
    (value) => {
        setCredentials((state) => ({ ...state, ...value }))
    },
    [setCredentials],
  )

  const handleChangeSelectedRecommendSongs = useCallback(
    (value) => {
        setSelectedRecommendSongs((state) => ({ ...state, ...value }))
    },
    [setCredentials],
  )

  const handleSubmit = async () => {
    try {
      const newPlaylist = {
        ...credentials,
        song_ids: credentials.song_ids.concat(selectedRecommendSongs.song_ids)
      }
      const response = await playlistApi.createNew(newPlaylist)
      if (response.status === 200) {
        console.log(response.data.message);
        navigation.navigate("Playlists");
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      alert(error.response.data.message)
    }
  }

  return (
    <Block flex center style={styles.home}>
      <StatusBar hidden />
      <ScrollView>
        <Block style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Title:</Text>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="Your playlist's title"
            placeholderTextColor={'#8898AA'}
            iconContent={<Block />}
            onChangeText={(value) => setCredentials({...credentials, title: value })}
          />
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Description:</Text>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="Description"
            placeholderTextColor={'#8898AA'}
            iconContent={<Block />}
            onChangeText={(value) => setCredentials({...credentials, description: value })}
          />
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Search song:</Text>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="Title, artists"
            placeholderTextColor={'#8898AA'}
            iconContent={<Block />}
            onChangeText={(value) => setParams({...params, txt_search: value })}
          />
        </Block>

        <Block
          safe
          flex
          style={{ width, zIndex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}
        >
          <Text
            numberOfLines={1}
            style={{ fontSize: 16, marginTop: 20, marginBottom: 5, fontWeight: "bold", marginLeft: 10 }}
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
                        selectMode={{
                          credentials: credentials.song_ids,
                          handleChangeCredentials: handleChangeCredentials,
                        }}
                      />
                    )
                  })}
              </Block>
            </ScrollView>
          </Block>

          <Text
            numberOfLines={1}
            style={{ fontSize: 16, marginTop: 20, marginBottom: 5, fontWeight: "bold", marginLeft: 10 }}
          >
            Recommend songs
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
                {recommendSongs &&
                  recommendSongs.map((song) => {
                    return (
                      <SongItem
                        key={`song-${song.id}`}
                        song={song}
                        navigation={navigation}
                        selectMode={{
                          credentials: selectedRecommendSongs.song_ids,
                          handleChangeCredentials: handleChangeSelectedRecommendSongs,
                        }}
                      />
                    )
                  })}
              </Block>
            </ScrollView>
          </Block>
        </Block>
        <Button 
          small center color="secondary"
          textStyle={{ color: 'black', fontSize: 16, fontWeight: '700' }}
          style={{
            width: 'auto',
            height: 50,
            paddingHorizontal: theme.SIZES.BASE,
            paddingVertical: 10,
          }}
          onPress={handleSubmit}
        >
          Done
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


