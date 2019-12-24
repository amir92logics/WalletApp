import React from 'react';
import {
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
// import { AnimatedModal } from 'react-native-modal-animated';
// import { WebBrowser } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
 import AddExpense from './addExpenseModels/addExpense'
 import AllCategoryModel from './allCategoryModel'
 
import { MonoText } from '../components/StyledText';
import AddIncome from './addIncomeModels/addIncome';
import { connect } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
// import { incomeCategoryAction } from '../actions/allIncomeCategory';
// import { expenseCategoryAction } from '../actions/allExpenseCategory';

class CalendarMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      EmodalVisible: false,
      allCategoryState: false
    };
      this.setModalVisible=this.setModalVisible.bind(this);
      this.setEModalVisible=this.setEModalVisible.bind(this)
      this.setAllCategoryModel=this.setAllCategoryModel.bind(this)

    }
//  componentWillMount(){
//   this.props.add();
//   this.props.add1();
//  }


  setModalVisible(visible) {
    // console.log("parrent: "+visible)
    this.setState({modalVisible: visible});
  }
  setEModalVisible(visible) {
    this.setState({EmodalVisible: visible});
  }
  setAllCategoryModel(visible) {
    
    this.setState({allCategoryState: visible});
  }
  render() {
    return (
      <View style={styles.container} >
      <View>
     <AddIncome modalVisible={this.state.modalVisible} setModel={this.setModalVisible}/>
     <AddExpense EmodalVisible={this.state.EmodalVisible} setEModel={this.setEModalVisible}/>
     <AllCategoryModel allCategoryState={this.state.allCategoryState} setAllCategoryModel={this.setAllCategoryModel}/>

     


       

        {/* <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: true });
            alert
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Show Modal</Text>
        </TouchableOpacity> */}
      </View>

{/* Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  {cancelable: false},
); */}





 <View style={styles.prevContainer}>
 <TouchableOpacity   onPress={()=>this.setModalVisible(!this.state.modalVisible)} >
 <View style={{flexDirection:'row',padding:10}}>
    
      <View style={{ flexWrap: 'wrap', alignItems: 'flex-end',}}>
 <Text   style={{fontSize:15,color:"white",lineHeight: 15,}}>Add </Text>
 <Text   style={{fontSize:15,color:"white",lineHeight: 15,}}>Income </Text>
 </View>
 <Icon name="plus-circle" size={30} color='green'/>
 

 </View>
   </TouchableOpacity>
  
  </View>
  <View  style={{flex: 1, alignItems: 'center',paddingTop:12}} >
  <TouchableOpacity   onPress={() => {this.setAllCategoryModel(!this.state.allCategoryState )}} >
 {/* <View style={{flex: 1, alignItems: 'center',paddingTop:12}}> */}
  <Icon   name='cogs' size={30} color='white'/>
 {/* </View> */}
 {/* <Text   style={{fontSize:20,color:"white"}}>Setting</Text> */}

   </TouchableOpacity>
    </View>
            <View style={styles.prevContainer1}>
   
  <TouchableOpacity  onPress={() => {this.setEModalVisible(!this.state.EmodalVisible)}}>
  <View style={{flexDirection:'row',padding:10}}>
      
 <Icon  name='minus-circle' size={30} color='red'/>
      <View style={{marginLeft:5}}>
 <Text   style={{fontSize:15,color:"white",lineHeight: 15,}}>Add </Text>
 <Text   style={{fontSize:15,color:"white",lineHeight: 15,}}>Expense</Text>
 </View>
 
 </View>
   </TouchableOpacity>
  
  </View>
            
      </View>
      
    );
  }


}
// const mapStateToProps = state => {
//   return {
//     allIncomeCategory1: state.places.allIncomeCategory
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     add: () => {
//       dispatch(incomeCategoryAction())
//     },
//     add1: () => {
//       dispatch(expenseCategoryAction())
//     },
    
//   }
  
// }
export default CalendarMenu;

// export default connect(mapStateToProps,mapDispatchToProps)(CalendarMenu);
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
      alignItems:'center'
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