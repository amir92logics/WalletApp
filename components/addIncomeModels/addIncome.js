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
import { incomeCategoryAction } from '../../actions/allIncomeCategory';
import moment from 'moment';
// import  Income_Category from '../incomeCategory';
// import incomeCategory from '../allCategoryModel/incomeCategory';
class AddIncome extends React.Component {
  constructor(props){
      super(props);
      this.state = {
       selectIncomeCategoryInput:'',
       addAmountInput:0,
       allIncomeCategory:[],
       selectIncomeCategoryIconColorState: "#00b5ec",
       amountIconColorState: "#00b5ec",
       data:["malik", 'aamir', 'awan']
      
      };
      this.categoryRef = React.createRef();
      this.amountRef = React.createRef();
      this.incomeCategoryChange= this.incomeCategoryChange.bind(this);
      this.amountChange= this.amountChange.bind(this);
      this.closeIncomeModel= this.closeIncomeModel.bind(this);
      this.addIncome= this.addIncome.bind(this);
  }
  componentWillReceiveProps(){
    this.fetchData();
  // this.props.add5();

  //  this.incomeCategoryChange(this.state.data[0]);
  }
 
  componentDidMount(){
    // this.incomeByDate();
  }
  notifyMessage=(msg)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  addIncome=()=>{
    const {selectIncomeCategoryInput, addAmountInput}=this.state;
         
  // if(selectIncomeCategoryInput==="" ){
  //   this.categoryRef.current.focus();
  //   this.setState({
  //     selectIncomeCategoryIconColorState: 'red'
  //   })
 
  // }
  if(addAmountInput===0){
    this.amountRef.current.focus();
    this.setState({
      amountIconColorState: 'red'
    })
  
  }
  else{
    
    // console.log("from function: "+date);
    // console.log("Category: "+selectIncomeCategoryInput+" Amount: "+ addAmountInput)
    SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    
        SQLite.openDatabase({
            name: "WalletApp",
            location: "default"
        }).then((db) => {
            // console.log("Database open!");
            db.transaction((tx) => {
            //   tx.executeSql('DROP TABLE IF EXISTS Income', [])
            // console.log('database deleted successfully!!!')

              tx.executeSql('CREATE TABLE IF NOT EXISTS Income (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20),amount INT(10),date DATE)');
          }).then(() => {
            console.log('database created successfully!!!')
          }).catch(error => {
              console.log(error);
          });
            db.transaction((tx) => {
              // var date=moment().format("L");
              var date="12/03/2019";
            tx.executeSql(
              'INSERT INTO Income (category,amount,date) VALUES (?,?,?)',
              [selectIncomeCategoryInput,addAmountInput, date],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  this.notifyMessage("Income added successfully!!!")
                this.setState({
                  addAmountInput: ''
                })
                } else {
                  this.notifyMessage("Failed to add Income!!!")
                }
              }
            );
          }).catch(error => {
              console.log(error);
          });
         
        });
  }
  
  
          }
 incomeCategoryChange(value){
              console.log("value: "+value);

            this.setState({
              selectIncomeCategoryInput: value,
              selectIncomeCategoryIconColorState: '#00b5ec'
            })
          }
amountChange(value){
  this.setState({
    addAmountInput: value,
    amountIconColorState: '#00b5ec'
  })
}
  closeIncomeModel=()=>{
    // this.props.fetchData();
    this.props.setModel(!this.props.modalVisible)
  }
  fetchData=()=>{
    console.log("Database open Now!");

    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
        name: "WalletApp",
        location: "default"
    }).then((db) => {
     db.transaction((tx) => {
        // console.log("Database open Now!");
        tx.executeSql(
         'SELECT * FROM Income_Category',
         [],
         (tx, results) => {
           var len = results.rows.length;
           // var len = results.rows.length;
           var record =[];
           for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
             
                record.push(row.category)
               
            }
            // this.props.add5(record);

            this.setState({allIncomeCategory: record});
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
    
    const{ allIncomeCategory,selectIncomeCategoryIconColorState,amountIconColorState}=this.state;
    // const{ allIncomeCategory}=this.props;
    // console.log("cate: "+this.props.allIncomeCategory1)
    let items =allIncomeCategory.map((data, key)=>{
      return<Picker.Item key={key} label={data} value={data} />
   
  });
  // this.props.add5()
 
  
    return(
      <>


      <Modal
          animationType="fade"
          transparent={false} 
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          >
              <View style={styles.container1}>
        {/* <View style={styles.inputContainer}>
        <Icon name="plus-circle" size={20} color={selectIncomeCategoryIconColorState}/>
        <TextInput style={styles.inputs}
              placeholder="INCOME"
              ref={this.categoryRef}
              autoFocus
              underlineColorAndroid='transparent'
              onChangeText={(selectIncomeCategoryInput) => this.incomeCategoryChange(selectIncomeCategoryInput)}/>
        </View> */}
      

  
        <View style={styles.inputContainer}>
        <Icon name="plus-circle" size={20} color={selectIncomeCategoryIconColorState}/>
       
        < Picker
selectedValue={this.state.selectIncomeCategoryInput}
style={styles.inputs}
onValueChange={(selectIncomeCategoryInput, index) => this.incomeCategoryChange(selectIncomeCategoryInput)}
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
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.addIncome()}>
          <Text style={styles.loginText}>ADD INCOME</Text>
        </TouchableHighlight>

      </View>
                
                  <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => this.closeIncomeModel()}>
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
    allIncomeCategory: state.places.allIncomeCategory
  }
}
const mapDispatchToProps = dispatch => {
  return {
    add5: () => {
      dispatch(incomeCategoryAction())
    },
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddIncome);

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
