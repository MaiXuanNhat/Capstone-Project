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

import { Icon, Input, SongItem, Button } from '../components';

import { Images, argonTheme } from '../constants'
const { width, height } = Dimensions.get('screen')
import { HeaderHeight } from '../constants/utils';
import useAuth from '../hooks/useAuth';
import songApi from '../api/songApi';

export default function Articles(props) {
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
  const playlists = [
    { id: 0, title: "You Belong With Me ", artists: "Taylor Swift" },
    { id: 1, title: "Boombayah", artists: "Black Pink" },
    // {id: 2, title: "atmosphere ", artists: ""},
    // {id: 3, title: "bard ", artists: ""},
    // {id: 4, title: "circus ", artists: ""},
    // {id: 5, title: "deep big room ", artists: ""},
  ]
  return (
    <Block flex center style={styles.home}>
      <StatusBar hidden />
      <Block flex>
        <Block style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Title:</Text>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="Your playlist's title"
            placeholderTextColor={'#8898AA'}
            iconContent={<Block />} />
          <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Description:</Text>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="Description"
            placeholderTextColor={'#8898AA'}
            iconContent={<Block />} />
            <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "bold", marginLeft: 10 }}>Number of songs:</Text>
          <Input
            right
            color="black"
            style={styles.search}
            placeholder="2"
            placeholderTextColor={'black'}
            iconContent={<Icon
              size={20}
              color="black"
              name="up"
              family="AntDesign"
            />} />
          {/* <Input
            right
            color="black"
            style={styles.search}
            placeholder="Find playlists"
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
          /> */}
        </Block>
        <Block
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex style={{ marginBottom: HeaderHeight * 2.25 }}>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: theme.SIZES.BASE }}
            >
              <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/021/532/385/small_2x/add-plus-sign-icon-free-vector.jpg" }}
              />
              <View style={{ flex: 1, }}>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "bold", fontSize: 14, color: "black" }}
                >
                  Add new song...
                </Text>
                <Text style={{ marginTop: 4, color: "black" }}>

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
                  name="right"
                  family="AntDesign"
                />
              </View>
            </Pressable>
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
                  {playlists &&
                    playlists.map((playlist) => {
                      return (
                        <SongItem
                          key={`song-${playlist.id}`}
                          song={playlist}
                          navigation={navigation}
                        />
                      )
                    })}
                </Block>
              </Block>
            </ScrollView>
            {/* <Block row space="evenly" style={{marginTop: 425}}>
              <Button small center color="warning" style={{
                width: 'auto',
                height: 34,
                paddingHorizontal: theme.SIZES.BASE,
                paddingVertical: 10,
              }}>
                Cancel
              </Button>
              <Button small center color="success"
                textStyle={{ fontSize: 12, fontWeight: '700' }} style={{
                  width: 'auto',
                  height: 34,
                  paddingHorizontal: theme.SIZES.BASE,
                  paddingVertical: 10,
                }}>
                Done
              </Button>
            </Block> */}
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


