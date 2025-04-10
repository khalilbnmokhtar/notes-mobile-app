import { View , Text, StyleSheet } from "react-native";

const NoteScreen = () => {
    return (
    <View style={StyleSheet.caontainer}>
       <Text> notes there !! </Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
      },
      noNotesText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 15,
      },
})

export default NoteScreen