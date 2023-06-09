import React, { useState } from 'react'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native'
import { Block, Checkbox, Text, theme } from 'galio-framework'
import { useForm, Controller } from 'react-hook-form'

import { Button, Icon, Input } from '../components'
import { Images, argonTheme } from '../constants'

import auth from '../api/auth'

const { width, height } = Dimensions.get('screen')

function Register(props) {
  const { navigation } = props

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const pwd = watch('password')

    

  const onSubmit = async (formData) => {
    try {
      const response = await auth.register(formData)
      if (response.request.status === 200) {
        console.log(response.data.message)
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
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
            <Block flex={0.2} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign up with
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
              <Block flex={0.1} middle>
                <Text color="#8898AA" size={12}>
                  Or sign up the classic way
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Name is required',
                        maxLength: {
                          value: 20,
                          message: 'Name should be under 20 characters',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          borderless
                          placeholder="Name"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      )}
                      name="name"
                    />
                    {errors.name && (
                      <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                        {errors.name.message || 'Error'}
                      </Text>
                    )}
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Email is required',
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          borderless
                          placeholder="Email"
                          onBlur={onBlur}
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
                      <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                        {errors.email.message || 'Error'}
                      </Text>
                    )}
                  </Block>                  
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message:
                            'Password should be at least 6 characters long',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          password
                          borderless
                          placeholder="Password"
                          onBlur={onBlur}
                          onChangeText={onChange}
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
                      <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                        {errors.password.message || 'Error'}
                      </Text>
                    )}
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Controller
                      control={control}
                      rules={{
                        validate: (value) =>
                          value === pwd || 'Password not match',
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          password
                          borderless
                          placeholder="Confirm Password"
                          onBlur={onBlur}
                          onChangeText={onChange}
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
                      name="confirmPassword"
                    />
                    {errors.confirmPassword && (
                      <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                        {errors.confirmPassword.message || 'Error'}
                      </Text>
                    )}
                  </Block>
                  <Block row width={width * 0.75}>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3,
                      }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="I agree with the"
                    />
                    <Button
                      style={{ width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14,
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Block>
                  <Block middle>
                    <Button
                      onPress={handleSubmit(onSubmit)}
                      color="primary"
                      style={styles.submitButton}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        CREATE ACCOUNT
                      </Text>
                    </Button>
                  </Block>
                  <Text
                    style={styles.navigateToLogin}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Already had an account? Sign in now!
                  </Text>
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
    height: height * 0.915,
    backgroundColor: '#F4F5F7',
    borderRadius: 15,
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
  submitButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  navigateToLogin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'gray',
    marginTop: 10,
  },
})

export default Register
