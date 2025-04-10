import { Stack } from "expo-router";

const  RootLayout = () => {
  return <Stack 
   screenOptions={{
     headerStyle: {
      backgroundColor : "blue" , 
     }, 
     headerTintColor : "#fff",  
     headerTitleAlign : "center",
    headerTitleStyle : {
      fontSize : 20 , 
      fontWeight : "bold"
    }

   }}
  >
    <Stack.Screen name="index" options={{ title : "Home"}} />
    <Stack.Screen name="notes" options={{ headerTitle : "Notes"}} />
    
    </Stack>;
}
export default RootLayout