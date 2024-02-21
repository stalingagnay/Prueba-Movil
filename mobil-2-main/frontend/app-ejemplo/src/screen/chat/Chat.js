import React, { useRef } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { useCompletion } from './CompletionAPI'
import Icon from 'react-native-vector-icons/FontAwesome'
import MessageInput from './MessageInput'
import Item from './Item'


const trashIcon = <Icon name='trash' size={20} color="red" />

const Chat = () => {
  const flatList = useRef(null)
  const { listMessage, clearList, prompt, setPrompt, onSubmit } = useCompletion()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatGPT API UCE</Text>
      {
        listMessage.length === 0
        &&
        <View style={styles.titleVoid}>
          <Text style={styles.message}>Si tienes cualquier inquietud o duda puedes consultarme</Text>
        </View>
      }
      <FlatList
        ref={flatList}
        data={listMessage}
        renderItem={({ item }) => <Item item={item} />}
        onContentSizeChange={() => listMessage.length > 0 && flatList.current.scrollToEnd({ animated: true })}
      />
      <MessageInput prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} type="numeric" />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  },
  titleVoid: {
    margin: 20,
    textAlign: 'center',
    color: 'black',
    width: 370,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  }
})