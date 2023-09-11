/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, Component, useEffect,FC} from 'react';
import { View, StyleSheet, TextInput, Button, Text, ActivityIndicator,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const {height, width} = Dimensions.get('screen');

interface Arry{
  text: string;
  completed: boolean
}


const App = ()=> {
  const [loading, setLoading] = useState<boolean>(true)
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [array, setArray] = useState<Arry[]>([]);

  async function startLoading() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  const IsComplete = (index:number) =>{
    const newList = [...array];
    newList[index].completed = !newList[index].completed
    setArray(newList)
  }
  
  useEffect(() => {
    startLoading().then(()=>setLoading(false))
  }, [])

  const submit = () => {
    if(value.trim())
    {
      setArray([...array, {text: value, completed: false}])
    }
    else
    {
      setError(true);
    }
    setValue("");
  }

  const remove = (index: number) => {
    const newList = [...array]
    newList.splice(index,1)
    setArray(newList)
  }

  const removeEverything = (index: number) => {
    const newList = [...array]
    newList.splice(index)
    setArray(newList)
  }

  function LoadingAnimation() {
    return (
      <View style={styles.load}>
        <Text style={({fontSize:50, margin:10, color:'#000'})}>Welcome</Text>
        <ActivityIndicator size="large"/>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     {loading ? <LoadingAnimation/>:
      <View style={styles.main}>
        <Text style={({fontSize:50, color:'#000', justifyContent:'center', alignItems:'center'})}>Welcome</Text>
          <TextInput 
          placeholder='Enter your task'
          onChangeText={e => {setValue(e); setError(false)}}
          value = {value}
          style={styles.input}
          />
          <View style={({flexDirection:'row'})}>
            <TouchableOpacity style={styles.button} onPress={submit}>
              <Text style={({color:'#fff'})}>Add task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={(e:any) => removeEverything(e)}>
              <Text style={({color:'#fff'})}>Delete all tasks</Text>
            </TouchableOpacity>
          </View>
          {error && (
        <Text style={({fontStyle:'italic'})}>Error: Input field is empty.... enter your task</Text>
      )}
      </View>
      }
      {array.map((ToDo: Arry, index: number) => (
      <View style={styles.list} key={`${index}_${ToDo.text}`}>
        <Text style={[styles.task,{textDecorationLine: ToDo.completed ? "line-through" : "none"}, {color: ToDo.completed ? "#ff0000" : '#000'}]}>{ToDo.text}</Text>
        <TouchableOpacity style={[styles.listButton, {backgroundColor:'#000'}]} onPress={() => IsComplete(index)}>
          <Text style={({color:'#fff'})}>{ToDo.completed ? "Completed" : "Complete"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listButton} onPress={() => remove(index)}>
          <Text style={({color:'#fff'})}>Delete</Text>
        </TouchableOpacity>
      </View>))}
    </View>
  );
}

const styles = StyleSheet.create({
    load:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    container:{
      flex:1,
      alignItems:'center'
    },
    main: {
      justifyContent:'flex-start',
      alignItems:'center',
      margin:10,
    },
    input:{
      borderWidth:0.5, 
      padding:10, 
      paddingHorizontal:50, 
      margin:10
    },
    button:{
      width:width /2.5,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:20,
      paddingVertical:5,
      borderRadius: 8,
      marginVertical:10,
      marginHorizontal:10,
      backgroundColor:'#000',
    },
    listButton:{
      borderRadius: 8,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#831000',
      margin:5,
      padding:5,
      paddingHorizontal:10,
    },
    list:{
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
      marginBottom: 10,
      padding:10,
      borderWidth:0.6
    },
    task:{
      width:width/2.0,
      alignItems:'center',
      color:'#000',
      justifyContent:'center',
      padding:10,
      fontSize:15,
    }
});

export default App;
