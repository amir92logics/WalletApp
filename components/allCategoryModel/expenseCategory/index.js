import React from 'react';
import {
  ToastAndroid,
  AlertIOS,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,Alert,Image
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpenseCategoryArray from '../../expenseCategory'

export default class ExpenseCategory extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        expenseCategoryInput:'',
        expenseDescriptionInput:'',
        categoryIconColorState: "#00b5ec",
        descriptionIconColorState: "#00b5ec",
      };
      this.categoryRef = React.createRef();
      this.descriptionRef = React.createRef();
      this.categoryChange= this.categoryChange.bind(this);
      this.descriptonChange= this.descriptonChange.bind(this);
      this.closeExpenseCategoryModel= this.closeExpenseCategoryModel.bind(this);
      this.addExpenseCategory= this.addExpenseCategory.bind(this);
 
  }
  notifyMessage=(msg)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  addExpenseCategory=()=>{
    const {expenseCategoryInput, expenseDescriptionInput}=this.state;
         
  if(expenseCategoryInput==="" ){
    this.categoryRef.current.focus();
    this.setState({
      categoryIconColorState: 'red'
    })
 
  }
  if(expenseDescriptionInput===""){
    this.descriptionRef.current.focus();
    this.setState({
      descriptionIconColorState: 'red'
    })
  
  }
  else{
    SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    
        SQLite.openDatabase({
            name: "WalletApp",
            location: "default"
        }).then((db) => {
            // console.log("Database open!");
            db.transaction((tx) => {
              tx.executeSql('CREATE TABLE IF NOT EXISTS Expense_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
          }).then(() => {
            console.log('database created successfully!!!')
          }).catch(error => {
              console.log(error);
          });
            db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO Expense_Category (category,description) VALUES (?,?)',
              [expenseCategoryInput,expenseDescriptionInput],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  this.notifyMessage("Category added successfully!!!")
                this.setState({
                  expenseCategoryInput: '',
                  expenseDescriptionInput: ''
                })
                } else {
                  this.notifyMessage("Failed to add Category!!!")
                }
              }
            );
          }).catch(error => {
              console.log(error);
          });
         
        });
  }
}
categoryChange(value){
  this.setState({
    expenseCategoryInput: value,
    categoryIconColorState: '#00b5ec'
  })
}
descriptonChange(value){
this.setState({
expenseDescriptionInput: value,
descriptionIconColorState: '#00b5ec'
})
}
closeExpenseCategoryModel=()=>{
this.props.fetchExpenseCategory();
this.props.ExpenseCategoryModel(!this.props.expenseCategoryState)
}
   render(){
    const{ categoryIconColorState,descriptionIconColorState}=this.state;

    //    console.log("child: "+this.props.modelState)
       return(
        <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.expenseCategoryState}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        >
        {/* <View >
          <View> */}
            {/* <Text>Hello World!</Text> */}
            <View style={styles.container1}>
      <View style={styles.inputContainer}>
      <Icon name="plus-circle" size={20} color={categoryIconColorState}/>
      <TextInput style={styles.inputs}
            placeholder="Expense"
            ref={this.categoryRef}
            autoFocus
            underlineColorAndroid='transparent'
            onChangeText={(expenseCategoryInput) => this.categoryChange(expenseCategoryInput)}/>
      </View>
      
      <View style={styles.inputContainer}>
      <Icon name="plus-circle" size={20} color={descriptionIconColorState}/>
        <TextInput style={styles.inputs}
            placeholder="Description"
            ref={this.descriptionRef}
            underlineColorAndroid='transparent'
            onChangeText={(expenseDescriptionInput) => this.descriptonChange(expenseDescriptionInput)}/>
      </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.addExpenseCategory()}>
        <Text style={styles.loginText}>ADD EXPENSE CATEGORY</Text>
      </TouchableHighlight>

      {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
          <Text>Register</Text>
      </TouchableHighlight> */}
    </View>
                {/* </form> */}
                <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => this.closeExpenseCategoryModel()}>
                <Text style={styles.homeText}>BACK</Text>
              </TouchableOpacity>
           
      </Modal>
       
       )
   }
}
   const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    justifyContent:"space-between",
    // paddingTop: 30,
    // marginTop:23,

    // color: 'rgba(96,100,109, 1)',
    // height:80,
    backgroundColor:  'rgb(255,150,0)',
  },
  homeBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',

  },
  homeText: {
    color: '#fff',
    fontWeight: 'bold'
    },
  prevContainer: {
    flex: 1,
   borderRightWidth:1,
   borderColor:"lightgrey",
        // flexDirection: 'column',
    // flexWrap: 'wrap', 
    alignItems: 'center',
    // flexDirection:'row',
// textAlign:'center',
    // justifyContent:"space-between",
    // paddingTop: 30,

    // color: 'rgba(96,100,109, 1)',
    // height:80,
    // backgroundColor: '#124b78',
  },
  prevContainer1: {
    flex: 1,
   borderLeftWidth:1,
   borderColor:"lightgrey",
        // flexDirection: 'column',
    // flexWrap: 'wrap', 
    alignItems: 'center',
    // flexDirection:'row',
// textAlign:'center',
    // justifyContent:"space-between",
    // paddingTop: 30,

    // color: 'rgba(96,100,109, 1)',
    // height:80,
    // backgroundColor: '#124b78',
  },
  developmentModeText: {
    // marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 0,
    textAlign: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      paddingLeft: 15
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});