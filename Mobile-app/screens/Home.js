import React, { useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Block, theme } from 'galio-framework';

import { Icon, Input, SongItem, Button } from '../components';

import { Images, argonTheme } from '../constants'
const { width, height } = Dimensions.get('screen')
import { HeaderHeight } from '../constants/utils';
import useAuth from '../hooks/useAuth';
import songApi from '../api/songApi';
import historyApi from '../api/historyApi';
import recommendApi from '../api/recommendApi';

export default function Home(props) {
  const { navigation } = props
  const { authUser, isLoading, setIsLoading } = useAuth()
  const isFocused = useIsFocused()
  const [refresh, forceRefresh] = useState()
  const [songs, setSongs] = useState(null)
  const defaultParams = {
    limit: 20,
    page: 1,
    txt_search: null,
  }
  const [params, setParams] = useState(defaultParams)
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (isFocused) {
      forceRefresh((prev) => !prev)
    }
  }, [isFocused])
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
    async function fetchHistoriesData() {
      setIsLoading(true)
      try {
        const response = await historyApi.getListByParams(params)
        setSongs(response.data.map(history => history.Song))
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        alert(error.response.data.message)
      }
    }
    async function fetchRecommendSongs() {
      try {
        const history = await historyApi.getListByParams(params)
        const response = await recommendApi.getSongRecommendations({
          query_song_ids: history.data.map(history => history.Song.id),
          limit: 10,
        })
        setSongs(response.data)
      } catch (error) {
        setIsLoading(false)
        alert(error.response.data.message)
      }
    }
    switch (tab) {
      case 0:
        fetchSongsData()
        break
      case 1:
        fetchHistoriesData()
        break
      case 2:
        fetchRecommendSongs()
        break
      default:
    }
  }, [refresh, params, tab])
  const handleTabs = useCallback(
    (tab) => {
      setTab(tab)
    },
    [setTab, setSongs],
  )


  return (
    <Block flex center style={styles.home}>
      <StatusBar hidden />
      <Block flex>
        <Block style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="Find songs"
            placeholderTextColor={'#8898AA'}
            value={params.txt_search}
            onChangeText={(value) =>
              setParams({ ...params, txt_search: value })
            }
            iconContent={
              params.txt_search ? (
                <Icon
                  size={20}
                  color={theme.COLORS.MUTED}
                  name="clear"
                  family="MaterialIcons"
                  onPress={() => setParams({ ...params, txt_search: null })}
                />
              ) : (
                <Icon
                  size={16}
                  color={theme.COLORS.MUTED}
                  name="search-zoom-in"
                  family="ArgonExtra"
                />
              )
            }
          />
        </Block>
        <Block
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex style={{ marginBottom: HeaderHeight * 2.25 }}>
            <Block row space="evenly" style={{ marginBottom: 20 }}>
              <Button
                small
                center
                color={tab === 0 ? 'success' : 'secondary'}
                textStyle={{ color: tab === 0 ? 'white' : 'black', fontSize: 16, fontWeight: '700' }}
                style={{
                  width: 'auto',
                  height: 40,
                  paddingHorizontal: theme.SIZES.BASE,
                  paddingVertical: 10,
                }}
                onPress={() => handleTabs(0)}
              >
                All
              </Button>
              <Button
                small
                center
                color={tab === 1 ? 'success' : 'secondary'}
                textStyle={{ color: tab === 1 ? 'white' : 'black', fontSize: 16, fontWeight: '700' }}
                style={{
                  width: 'auto',
                  height: 40,
                  paddingHorizontal: theme.SIZES.BASE,
                  paddingVertical: 10,
                }} onPress={() => handleTabs(1)}
              >
                History
              </Button>
              <Button
                small
                center
                color={tab === 2 ? 'success' : 'secondary'}
                textStyle={{ color: tab === 2 ? 'white' : 'black', fontSize: 16, fontWeight: '700' }}
                style={{
                  width: 'auto',
                  height: 40,
                  paddingHorizontal: theme.SIZES.BASE,
                  paddingVertical: 10,
                }}
                onPress={() => handleTabs(2)}
              >
                Recommend
              </Button>
            </Block>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => forceRefresh((prev) => !prev)}
                />
              }
            >
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
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
              </Block>
            </ScrollView>
          </Block>
        </Block>
      </Block>
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


