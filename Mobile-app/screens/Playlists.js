import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Image,
  View,
  Text,
} from 'react-native'
import { Block, theme } from 'galio-framework';

import { Images, argonTheme } from '../constants'
import { HeaderHeight } from '../constants/utils';
import { Icon, Input, Button, PlaylistItem } from '../components';

import useAuth from '../hooks/useAuth';
import playlistApi from '../api/playListApi';

const { width, height } = Dimensions.get('screen')

export default function Playlists(props) {
  const { navigation } = props
  const { isLoading, setIsLoading } = useAuth()

  const [refresh, forceRefresh] = useState()
  const [playlists, setPlaylists] = useState(null)

  const defaultParams = {
    txt_search: '',
  }
  const [params, setParams] = useState(defaultParams)

  useEffect(() => {
    async function fetchPlaylistsData() {
      setIsLoading(true)
      try {
        const response = await playlistApi.getListByParams(params)
        setPlaylists(response.data.rows)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        alert(error.response.data.message)
      }
    }

    fetchPlaylistsData()
  }, [refresh, params])

  return (
    <Block flex center style={styles.home}>
      <StatusBar hidden />
      <Block flex style={{ width, height, zIndex: 1 }}>
        <Block style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Search:</Text>
          <Block row space="evenly" center>
            <Input
              right
              color="black"
              style={styles.search}
              placeholder="Your playlist's title"
              placeholderTextColor={'#8898AA'}
              iconContent={<Block />}
              onChangeText={(value) => setParams({ txt_search: value })}
            />
            <Pressable onPress={() => navigation.navigate("AddPlaylist")}>
              <Icon size={25} name="library-add" family="MaterialIcons" style={{ paddingRight: 8, marginLeft: 20 }} color={argonTheme.COLORS.ICON}/>
            </Pressable>
          </Block>
        </Block>

        <Block flex style={{ width, height, zIndex: 1, backgroundColor: 'white' }}>
          <Block safe flex style={{ marginBottom: HeaderHeight * 2.25 }}>
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
                  {playlists && playlists.length > 0 ?
                    playlists.map((playlist) => {
                      return (
                        <PlaylistItem
                          key={`playlist-${playlist.id}`}
                          playlist={playlist}
                          navigation={navigation}
                        />
                      )
                    }) :
                    <Text>No playlist found</Text>
                  }
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
  search: {
    width: "100%",
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});


