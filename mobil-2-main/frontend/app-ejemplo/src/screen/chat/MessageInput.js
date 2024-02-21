import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const sentIcon = <Icon name='location-arrow' size={15} color="white" />

const MessageInput = ({ onSubmit, prompt, setPrompt, type }) => {

  const handleChange = (value) => {
    setPrompt(value)
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.inputText}
        multiline
        keyboardType={type ? type : "default"}
        placeholder="Escribe tu mensaje..."
        value={prompt}
        onChangeText={handleChange}
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text>
          {sentIcon}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 40,
    backgroundColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 700
  },
  inputText: {
    width: 600,
    backgroundColor: "white",
    color: "#363636",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
})

export default MessageInput;