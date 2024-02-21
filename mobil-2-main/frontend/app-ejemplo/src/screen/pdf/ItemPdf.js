import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ItemPdf = ({ item, isLoading }) => {
  const { id, message, query } = item
  return (
    <View key={id} style={styles.containerItem}>
      <View style={styles.containerPrompt}>
        <Text style={styles.text}>{query}</Text>
      </View>

      <View style={styles.containerAvatar}>
        <View>
          <Text style={styles.avatar}></Text>
        </View>
        <View style={styles.containerMessage}>
          <Text style={[styles.text, styles.messageText]}>
            {message}
            {"\n"}
          </Text>
        </View>
      </View>

    </View>
  )
}

export default ItemPdf;

const styles = StyleSheet.create({
  containerItem: {
    width: 380
  },
  containerPrompt: {
    backgroundColor: 'gray',
    maxWidth: '80%',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  containerAvatar: {
    flexDirection: 'row'
  },
  containerMessage: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  text: {
    color: 'white',
    maxWidth: '100%',
  },
  messageText: {
    flexShrink: 1,
  },
  avatar: {
    width: 20,
  }
})
