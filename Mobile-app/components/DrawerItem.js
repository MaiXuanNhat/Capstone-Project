import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Elements":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      case "Playlists":
        return (
          <Icon
            name="playlist-play"
            family="MaterialIcons"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Profile":
        return (
          <Icon
            name="chart-pie-35"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
      case "Account":
        return (
          <Icon
            name="calendar-date"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.INFO}
          />
        );
      case "Getting Started":
        return (<Icon
          name="spaceship"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "MusicPlayer":
        return (
          <Icon
            name="music"
            family="Entypo"
            size={20}
            color={focused ? "white" : argonTheme.COLORS.SUCCESS}
          />
        );
      case "Log out":
        return <Icon
          name="logout"
          family="MaterialIcons"
          size={20}
          color={focused ? 'white' : argonTheme.COLORS.BLACK}
        />
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation, handleLogout } = this.props

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ]

    const onLogoutTabPress = async () => {
      await handleLogout(navigation)
    }

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title === 'Log out'
            ? onLogoutTabPress()
            : navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? 'white' : 'rgba(0,0,0,0.5)'}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
})

export default DrawerItem