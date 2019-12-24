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
import { connect } from 'react-redux';
import { incomeCategoryAction } from '../../../actions/allIncomeCategory';
// import IncomeCategoryArray from '../../]'
class IncomeCategory extends React.Component {
  constructor(props){
      super(props);
      this.state = {
       incomeCategoryInput:'',
       incomeDescriptionInput:'',
       categoryIconColorState: "#00b5ec",
       descriptionIconColorState: "#00b5ec",
      };
      this.categoryRef = React.createRef();
      this.descriptionRef = React.createRef();
      this.categoryChange= this.categoryChange.bind(this);
      this.descriptonChange= this.descriptonChange.bind(this);
      this.closeIncomeCategoryModel= this.closeIncomeCategoryModel.bind(this);
      this.addIncomeCategory= this.addIncomeCategory.bind(this);
  }
  notifyMessage=(msg)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  // componentDidMount(){
  //    SQLite.DEBUG(true);
  //       SQLite.enablePromise(true);
    
  //       SQLite.openDatabase({
  //           name: "WalletApp",
  //           location: "default"
  //       }).then((db) => {
  //           // console.log("Database open!");
  //           db.transaction((tx) => {
  //             tx.executeSql('CREATE TABLE IF NOT EXISTS Income_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
  //         }).then(() => {
  //           console.log('database created successfully!!!')
  //         }).catch(error => {
  //             console.log(error);
  //         });
          
     
  //       });
  
  // }
  addIncomeCategory=()=>{
    const {incomeCategoryInput, incomeDescriptionInput}=this.state;
         
  if(incomeCategoryInput==="" ){
    this.categoryRef.current.focus();
    this.setState({
      categoryIconColorState: 'red'
    })
 
  }
  if(incomeDescriptionInput===""){
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
              tx.executeSql('CREATE TABLE IF NOT EXISTS Income_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
          }).then(() => {
            console.log('database created successfully!!!')
          }).catch(error => {
              console.log(error);
          });
            db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO Income_Category (category,description) VALUES (?,?)',
              [incomeCategoryInput,incomeDescriptionInput],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  this.notifyMessage("Category added successfully!!!")
                this.setState({
                  incomeCategoryInput: '',
                  incomeDescriptionInput: ''
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
              incomeCategoryInput: value,
              categoryIconColorState: '#00b5ec'
            })
          }
descriptonChange(value){
  this.setState({
    incomeDescriptionInput: value,
    descriptionIconColorState: '#00b5ec'
  })
}
  closeIncomeCategoryModel=()=>{
   this.props.fetchData();
    this.props.IncomeCategoryModel(!this.props.incomeCategoryState)
    
  }
   render(){
     const{ categoryIconColorState,descriptionIconColorState}=this.state;
    //    console.log("child: "+this.props.modelState)
       return(
        <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.incomeCategoryState}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        >
       
            <View style={styles.container1}>
      <View style={styles.inputContainer}>
      <Icon name="plus-circle" size={20} color={categoryIconColorState}/>
        <TextInput style={styles.inputs}
       ref={this.categoryRef}
            autoFocus
            placeholder="Category"
            underlineColorAndroid='transparent'
            onChangeText={(incomeCategoryInput) => this.categoryChange(incomeCategoryInput)}/>
      </View>
      {/* <View style={styles.errorView}>
        <Icon name="times-circle" size={25} color='red'/>
        <Text style={styles.errorText}>Category Empty!!!</Text>
      </View> */}
      
      <View style={styles.inputContainer}>
      <Icon name="plus-circle" size={20} color={descriptionIconColorState}fdad/>
        <TextInput style={styles.inputs}
             ref={this.descriptionRef}
            placeholder="Description"
            underlineColorAndroid='transparent'
            onChangeText={(incomeDescriptionInput) => this.descriptonChange(incomeDescriptionInput)}/>
      </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.addIncomeCategory()}>
        <Text style={styles.loginText}>ADD INCOME CATEGORY</Text>
      </TouchableHighlight>

    </View>
            
                <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => this.closeIncomeCategoryModel()}>
                <Text style={styles.homeText}>BACK</Text>
              </TouchableOpacity>
           
      </Modal>
       
       )
   }
}
const mapStateToProps = state => {
  return {
    allIncomeCategory: state.places.allIncomeCategory,
    allExpenseCategory: state.places.allExpenseCategory

  }
}
const mapDispatchToProps = dispatch => {
  return {
    add: () => {
      dispatch(incomeCategoryAction())
    }
    
  }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(IncomeCategory); 
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
  errorView:{
  flexDirection: 'row'
  },
  errorText: {
    marginLeft:3,
   color: 'red'
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