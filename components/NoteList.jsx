import { View, Text, FlatList } from 'react-native'
import React from 'react'
import NoteItem from './NoteItem'

export default function NoteList( {notes , onDelete , onEdit}) {
  return (
    <View>
     <FlatList 
            data={notes}
            keyExtractor={(item)=> item.$id}
            renderItem={({item}) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit}/>}
     
            />
    </View>
  )
}