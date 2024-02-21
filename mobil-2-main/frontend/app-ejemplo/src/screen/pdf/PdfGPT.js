import React, { useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import MessageInput from '../chat/MessageInput';
import { inferenceApi } from './inferenceApi';
import ItemPdf from './ItemPdf'

const EmptyDocument = ({ pickDocument }) => (
  <View style={styles.containerUpload}>
    <Feather name="file-text" size={50} color="gray" />
    <Text style={styles.containerTitle}>Puedes subir tus archivos aquí</Text>
    <Text style={styles.containerSupport}>El formato soportado es: PDF</Text>
    <TouchableOpacity style={styles.button} onPress={pickDocument}>
      <Text style={styles.textButton}>Buscar PDF</Text>
    </TouchableOpacity> 
  </View>
)

const DocumentUploaded = ({ document, isLoaded, handleClean }) => {
  return (
    <View style={!isLoaded ? styles.containerUpload : styles.containerLoaded}>
      <Feather name="file-text" size={!isLoaded ? 50 : 25} color="gray" />
      <Text style={!isLoaded ? styles.containerTitle : styles.containerTitleLoaded}>{document.name}</Text>
      {isLoaded && <TouchableOpacity onPress={handleClean}>
      </TouchableOpacity>}
    </View>
  )
}
const PdfGPT = () => {
  const [document, setDocument] = useState(null)
  const [query, setQuery] = useState()
  const [listMessage, setListMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const flatList = useRef(null)

  const pickDocument = async () => {
    try {
      const { mimeType, name, uri, type } = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true, 
      })
      if (type !== 'success') throw new Error('Error al subir el archivo')
      setDocument({ type: mimeType, name, uri })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCancel = () => {
    setDocument(null)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleClean = () => {
    setDocument(null)
    setIsLoaded(false)
    setListMessage([])
  }

  const handleUpload = async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('pdf', document)
    formData.append('question', query)
    try {
      const response = await inferenceApi({ data: formData })
      const data = {
        id: listMessage.length + 1,
        message: response.text || 'No se pudo obtener una respuesta',
        query
      }
      setListMessage([...listMessage, data])
    } catch (error) {
      console.log('Error al obtener respuesta del servidor')
    } finally {
      setQuery('')
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatPDF API UCE</Text>
      {!document
        ? <EmptyDocument pickDocument={pickDocument} />
        : <DocumentUploaded document={document} isLoaded={isLoaded} handleClean={handleClean} />
      }
      {(document && !isLoaded) &&
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancel}>
            <Text style={styles.buttonCancelar}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCargar} onPress={handleLoad}>
            <Text style={styles.textButtonCargar}>Cargar</Text>
          </TouchableOpacity>
        </View>
      }
      <FlatList
        data={listMessage}
        style={{ marginTop: 20 }}
        ref={flatList}
        renderItem={({ item }) => (<ItemPdf item={item} />)}
        onContentSizeChange={() => listMessage.length > 0 && flatList.current.scrollToEnd({ animated: true })}
      />
      {isLoading && <ActivityIndicator size="large" color="blue" />}
      {(document && isLoaded) && <MessageInput prompt={query} setPrompt={setQuery} onSubmit={handleUpload} />}
    </View>
  )
}

export default PdfGPT

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  containerUpload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'gray',
    width: '40%',
    height: 250,
    backgroundColor: 'white'
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  containerSupport: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    color: 'blue',
    textAlign: 'center'
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 240,
    marginTop: 30,
  },
  buttonCargar: {
    width: 75,
    height: 35,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCancelar: {
    width: 75,
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonCancelar: {
    color: 'black',
  },
  textButtonCargar: {
    color: 'black',
  },
  containerLoaded: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'gray',
    width: '40%',
    paddingVertical: 10,
  },
  containerTitleLoaded: {
    fontWeight: 'bold',
    marginLeft: 10,
  }
})