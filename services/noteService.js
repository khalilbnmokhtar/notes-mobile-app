import { ID , Query} from "react-native-appwrite";
import databaseService from "./databaseService";


const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID



const noteService = {
    async getNotes(userId) {
        if(!userId){
            console.error('no user id ')
            return {
                data : [] , error : "no user id"
            }

        }
        try {
            const response = await databaseService.listDocuments(dbId , colId , [
                Query.equal("user_id" , userId)
            ])
            return response
        } catch (error) {
            console.error("error fetching data ")
            return {data : [], error : error.message}
        }
        if (response.error){
            return { error : response.error}
        }

        return { data : response}
    }, 
    async addNote(user_id ,text){
        if (!text){
            return { error : "Please enter a note"}
        }
        const data = {
            text : text,
            createdAt : new Date().toISOString(),
            user_id : user_id
        }
        const response = await databaseService.createDocument(dbId , colId , data , ID.unique())
        if (response.error){
            return { error : response.error}
        }
        return { data : response}
    },
    async deleteNote(id){
      
        const response = await databaseService.deleteDocument(dbId , colId , id)
        if (response.error){
            return { error : response.error}
        }
        return { success : true}
    },
    async updateNote (text , id) {
        if (!text){
            return { error : "Please enter a note"}
        }
        const response = await databaseService.updateDocument(dbId , colId , id , {text}) 
        if (response.error){
            return { error : response.error}
        }
        return { data : response}
    }



}

export default noteService