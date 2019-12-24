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
  View,Alert,Image,Picker
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { ExpenseCategoryAction } from '../../actions/allExpenseCategory';
import moment from 'moment';
// import  Expense_Category from '../ExpenseCategory';
// import ExpenseCategory from '../allCategoryModel/ExpenseCategory';
class AddExpense extends React.Component {
  constructor(props){
      super(props);
      this.state = {
       selectExpenseCategoryInput:'',
       addAmountInput:0,
       allExpenseCategory:[],
       selectExpenseCategoryIconColorState: "#00b5ec",
       amountIconColorState: "#00b5ec",
       data:["malik", 'aamir', 'awan']
      
      };
      this.categoryRef = React.createRef();
      this.amountRef = React.createRef();
      this.expenseCategoryChange= this.expenseCategoryChange.bind(this);
      this.amountChange= this.amountChange.bind(this);
      this.closeExpenseModel= this.closeExpenseModel.bind(this);
      this.addExpense= this.addExpense.bind(this);
  }
  componentWillReceiveProps(){
    this.fetchData();
  // this.props.add5();

  //  this.expenseCategoryChange(this.state.data[0]);
  }
  notifyMessage=(msg)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  addExpense=()=>{
    const {selectExpenseCategoryInput, addAmountInput}=this.state;
         
  // if(selectExpenseCategoryInput==="" ){
  //   this.categoryRef.current.focus();
  //   this.setState({
  //     selectExpenseCategoryIconColorState: 'red'
  //   })
 
  // }
  if(addAmountInput===0){
    this.amountRef.current.focus();
    this.setState({
      amountIconColorState: 'red'
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
          //  tx.executeSql('DROP TABLE IF EXISTS Expense', [])
          //   console.log('database deleted successfully!!!')

                  tx.executeSql('CREATE TABLE IF NOT EXISTS Expense (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20),amount INT(10), date DATE)');
          }).then(() => {
            console.log('database created successfully!!!')
          }).catch(error => {
              console.log(error);
          });
            db.transaction((tx) => {
              let date=moment().format("L");
    // console.log("Category: "+date)
            tx.executeSql(
              'INSERT INTO Expense (category, amount, date) VALUES (?,?,?)',
              [selectExpenseCategoryInput,addAmountInput,date],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  this.notifyMessage("Expense added successfully!!!")
                this.setState({
                  addAmountInput: ''
                })
                } else {
                  this.notifyMessage("Failed to add Expense!!!")
                }
              }
            );
          }).catch(error => {
              console.log(error);
          });
         
        });
  }
  
  
          }
 expenseCategoryChange(value){
              console.log("value: "+value);

            this.setState({
              selectExpenseCategoryInput: value,
              selectExpenseCategoryIconColorState: '#00b5ec'
            })
          }
amountChange(value){
  this.setState({
    addAmountInput: value,
    amountIconColorState: '#00b5ec'
  })
}
  closeExpenseModel=()=>{
    // this.props.fetchData();
    this.props.setEModel(!this.props.EmodalVisible)
  }
  fetchData=()=>{
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open!");
        tx.executeSql(
         'SELECT * FROM Expense_Category',
         [],
         (tx, results) => {
           var len = results.rows.length;
           // var len = results.rows.length;
           var record =[];
           for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
             
                record.push(row.category)
               
            }
            this.setState({allExpenseCategory: record});
           // console.log('len',len);
           if (len > 0) {
             // console.log(results.rows.item(0).category);
            
           }else{
             // console.log('No user found');
            
           }
         }
       );
       });
    });
  }

   render(){
    
    const{ allExpenseCategory,selectExpenseCategoryIconColorState,amountIconColorState}=this.state;
    // const{ allExpenseCategory}=this.props;
    // console.log("cate: "+this.props.allExpenseCategory1)
    let items =allExpenseCategory.map((data, key)=>{
      return<Picker.Item key={key} label={data} value={data} />
   
  });
  // this.props.add5();
// console.log("from function: "+Expense_Category);
  
    return(
      <>


      <Modal
          animationType="fade"
          transparent={false} 
          visible={this.props.EmodalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          >
              <View style={styles.container1}>
        {/* <View style={styles.inputContainer}>
        <Icon name="plus-circle" size={20} color={selectExpenseCategoryIconColorState}/>
        <TextInput style={styles.inputs}
              placeholder="Expense"
              ref={this.categoryRef}
              autoFocus
              underlineColorAndroid='transparent'
              onChangeText={(selectExpenseCategoryInput) => this.expenseCategoryChange(selectExpenseCategoryInput)}/>
        </View> */}
      

  
        <View style={styles.inputContainer}>
        <Icon name="plus-circle" size={20} color={selectExpenseCategoryIconColorState}/>
       
        < Picker
selectedValue={this.state.selectExpenseCategoryInput}
style={styles.inputs}
onValueChange={(selectExpenseCategoryInput, index) => this.expenseCategoryChange(selectExpenseCategoryInput)}
>
   {items} 

  {/* <Picker.Item label='React' value='react' />
  <Picker.Item label='React Native' value='react native' /> */}


</Picker>
</View>

<View style={styles.inputContainer}>
        <Icon name="plus-circle" size={20} color={amountIconColorState}/>
         <TextInput style={styles.inputs}
              placeholder="AMOUNT"
              ref={this.amountRef}
              keyboardType='numeric'
              underlineColorAndroid='transparent'
              onChangeText={(addAmountInput) => this.amountChange(addAmountInput)}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.addExpense()}>
          <Text style={styles.loginText}>ADD Expense</Text>
        </TouchableHighlight>

      </View>
                
                  <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => this.closeExpenseModel()}>
                {/* onPress={() => this.props.setModel(!this.props.modalVisible)}> */}
                <Text style={styles.homeText}>Home</Text>
              </TouchableOpacity>
            
        </Modal>
       </>
       )
   }
}
const mapStateToProps = state => {
  return {
    allExpenseCategory: state.places.allExpenseCategory
  }
}
const mapDispatchToProps = dispatch => {
  return {
    add5: () => {
      dispatch(ExpenseCategoryAction())
    },
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddExpense);

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
