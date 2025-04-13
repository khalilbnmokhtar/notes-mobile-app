import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import NoteList from "../../components/NoteList";
import AddNoteModal from "../../components/AddNoteModal";
import noteService from "../../services/noteService";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";


const NoteScreen = () => {
  const [notes, setNotes] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState("");
  const router = useRouter()
  const { user , loading:authLoading } = useAuth()

  useEffect(()=>{
    if (!authLoading && !user) {
      router.replace(('/auth'))
    }
  },[user , authLoading])
  useEffect(()=>{
    user && fetchNotes()
  },[user])
  const fetchNotes = async () => {
    setLoading(true)
    const response = await noteService.getNotes(user.$id)
    if(response.error){
      setError(response.error)
      Alert.alert("Error", response.error)
    }else{
      setNotes(response.data)
      setError(null)
    }
    setLoading(false)
  }

  const addNote = async () => {
    if (newNote.trim() === "") return;
     const response = await noteService.addNote(user.$id, newNote)
     if(response.error){
      Alert.alert("Error" , response.error)
     }else{
      setNotes([...notes, response.data])
     }
    setNewNote("");
    setModalVisible(false);
  };

  const DeleteNote = async (id) =>{
    Alert.alert("Delete Note" , "Are your sure you want to delete this note?" , 
      [
        {
          text: "Cancel",
          style : "cancel"
        },
        {
          text: "Delete",
          style : "destructive",
          onPress : async () => {
            const response = await noteService.deleteNote(id)
            if(response.error){
              Alert.alert("Error" , response.error)
              }else{
                setNotes(notes.filter(note => note.$id !== id))
              }
          }
        }
      ]
    )
  }

  const updateNote = async (id , newText) =>{
    if (!newText.trim()) {
      Alert.alert('Error', 'Note text cannot be empty');
      return;
    }
    const response = await noteService.updateNote( newText , id);
    if (response.error) {
      Alert.alert('Error', response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
        )
      );
    }
  }

  return (
    <View style={styles.container}>
     {
      loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
           {error && <Text style={styles.errorText}>{error}</Text>}
            
           {notes.length === 0 ? (
            <Text style={styles.noNotesText}>You have no notes</Text>
          ) : (
            <NoteList notes={notes} onDelete={DeleteNote} onEdit={updateNote} />
          )}
     
        </>
      )
     }

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}> + Add Note </Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
});

export default NoteScreen;
