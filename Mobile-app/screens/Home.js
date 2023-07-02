import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { Block, theme } from 'galio-framework';

import { Icon, Input, SongItem, Button } from '../components';

import { Images, argonTheme } from '../constants'
const { width, height } = Dimensions.get('screen')
import { HeaderHeight } from '../constants/utils';
import useAuth from '../hooks/useAuth';
import songApi from '../api/songApi';

export default function Home(props) {
  const { navigation } = props
  const { authUser, isLoading, setIsLoading } = useAuth()
  const [refresh, forceRefresh] = useState()
  const [songs, setSongs] = useState(null)
  const defaultParams = {
    limit: 10,
    page: 1,
    txt_search: null,
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
            <Block row space="evenly">
              <Button small center color="primary" style={{
                width: 'auto',
                height: 34,
                paddingHorizontal: theme.SIZES.BASE,
                paddingVertical: 10,
              }}>
                All
              </Button>
              <Button small center color="secondary"
                textStyle={{ color: 'black', fontSize: 12, fontWeight: '700' }} style={{
                  width: 'auto',
                  height: 34,
                  paddingHorizontal: theme.SIZES.BASE,
                  paddingVertical: 10,
                }}>
                History
              </Button>
              <Button small center color="secondary"
                textStyle={{ color: 'black', fontSize: 12, fontWeight: '700' }}
                style={{
                  width: 'auto',
                  height: 34,
                  paddingHorizontal: theme.SIZES.BASE,
                  paddingVertical: 10,
                }}>
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


