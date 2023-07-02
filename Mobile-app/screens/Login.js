import React from 'react'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  View,
  KeyboardAvoidingView,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Block, Text, theme } from 'galio-framework'

import { Button, Icon, Input } from '../components'
import { Images, argonTheme } from '../constants'

import useAuth from '../hooks/useAuth'

const { width, height } = Dimensions.get('screen')

function Login(props) {
  const { navigation } = props
  const { handleLogin } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (credentials) => {
    await handleLogin(credentials, navigation)
  }

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign in with
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                  <Block row>
                    <Icon
                      name="logo-github"
                      family="Ionicon"
                      size={14}
                      color={'black'}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GITHUB</Text>
                  </Block>
                </Button>
                <Button style={styles.socialButtons}>
                  <Block row>
                    <Icon
                      name="logo-google"
                      family="Ionicon"
                      size={14}
                      color={'black'}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GOOGLE</Text>
                  </Block>
                </Button>
              </Block>
            </Block>
            <Block flex>
              <Block flex={0.17} middle>
                <Text color="#8898AA" size={12} style={{ marginTop: -15 }}>
                  Or sign in the classic way
                </Text>
              </Block>
              <Image
                source={Images.ArgonLogo}
                style={styles.picture}
              />
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block
                    width={width * 0.86}
                    style={{ marginBottom: 15, marginTop: 15 }}
                  >
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          borderless
                          placeholder="Email"
                          onChangeText={onChange}
                          value={value}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="ic_mail_24px"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      )}
                      name="email"
                    />
                    {errors.email && (
                      <Text style={styles.error}>
                        {errors.email.message || 'Error'}
                      </Text>
                    )}
                  </Block>
                  <Block width={width * 0.86}>
                    <Controller
                      control={control}
                      rules={{
                        maxLength: 100,
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          borderless
                          placeholder="Password"
                          onChangeText={onChange}
                          secureTextEntry={true}
                          value={value}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="padlock-unlocked"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      )}
                      name="password"
                    />
                    {errors.password && (
                      <Text style={styles.error}>
                        {errors.password.message || 'Error'}
                      </Text>
                    )}
                  </Block>
                  <Text
                    style={styles.forgotPassword}
                    onPress={() => Linking.openURL('http://google.com')}
                  >
                    Forgot password?
                  </Text>
                  <Block middle>
                    <Button
                      title="Login"
                      size={14}
                      onPress={handleSubmit(onSubmit)}
                      color="primary"
                      style={styles.createButton}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        LOGIN
                      </Text>
                    </Button>
                    <View>
                      <Text
                        style={styles.createAccount}
                        onPress={() => navigation.navigate('Register')}
                      >
                        Create a new account
                      </Text>
                    </View>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  )
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8898AA',
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  picture: {
    width: 120,
    height: 120,
    marginTop: -20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  forgotPassword: {
    color: 'gray',
    textAlign: 'right',
    marginTop: 10,
  },
  createAccount: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'gray',
    marginTop: 10,
  },
})

export default Login