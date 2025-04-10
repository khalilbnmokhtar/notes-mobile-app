import { databases } from "./appwrite";

const databaseService = {
    async listDocuments (dbId , colId) {
        try {
            const response = await databases.listDocuments(dbId , colId)
            return response.documents || []
        } catch (error) {
            console.error('error gettiing docs :', error.message)
            return { error : error.message}
        }
    },

    async createDocument (dbId , colId , data , id = null ) {
        try {
            return await databases.createDocument(dbId , colId , id || undefined , data )
        } catch (error) {
            console.error("error creating docs" , error.message)
            return { error : error.message}
        }
    },

    async deleteDocument (dbId , colId ,  id  ) {
        try {
            await databases.deleteDocument(dbId , colId , id)
            return {success : true}
        } catch (error) {
            console.error("error deleting docs" , error.message)
            return { error : error.message}
        }
    },

    async updateDocument (dbId , colId ,  id , data ) {
        try {
            return await databases.updateDocument(dbId , colId , id , data)
        } catch (error) {
            console.error("error updating docs" , error.message)
            return { error : error.message}
        }
    },




}

export default databaseService