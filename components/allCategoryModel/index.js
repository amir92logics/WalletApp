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
import IncomeCategory from './incomeCategory';
import ExpenseCategory from './expenseCategory'
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { incomeCategoryAction } from '../../actions/allIncomeCategory';
import { expenseCategoryAction } from '../../actions/allExpenseCategory';
import { isMoment } from 'moment';

class AllCategory extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        incomeCategoryState: false,
        expenseCategoryState: false,
        allIncomeCategory:[],
        allExpenseCategory:[]

        
      };
      this.renderAllExpenseCategory=this.renderAllExpenseCategory.bind(this);
      this.IncomeCategoryModel=this.IncomeCategoryModel.bind(this);
      this.ExpenseCategoryModel=this.ExpenseCategoryModel.bind(this)
  }
  IncomeCategoryModel(visible) {
    // console.log("parrent: "+visible)
    this.setState({incomeCategoryState: visible});
  }
  ExpenseCategoryModel(visible) {
    this.setState({expenseCategoryState: visible});
  }
  notifyMessage=(msg)=> {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
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
        console.log("Database open Now!");
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
  fetchExpenseCategory=()=>{
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
  componentDidMount(){
// this.setState({
//   allExpenseCategory: ExpenseCategoryArray,
// allIncomeCategory: IncomeCategoryArray
// })
  this.fetchData();  
  this.fetchExpenseCategory();
 }

 renderAllExpenseCategory=()=>{
  // this.props.allIncomeCategory;
  const {allExpenseCategory}= this.state;
  return(
  <>
 {allExpenseCategory.map((data, key)=>{
    return (
      <View key={key} style={styles.incomeCategoryContainer}>
        
 <Text>{data}</Text>
 <View style={styles.btnContainer}>
   <TouchableOpacity>
     <Text>Delete</Text>
   </TouchableOpacity>
   <TouchableOpacity>
     <Text>Edit</Text>
   </TouchableOpacity>
 </View>
      </View>
    )
  })
 }
 </>
 );
 }
   render(){
    //  console.log('my data: '+ IncomeCat)
     const {allIncomeCategory}= this.state;
     const incomeCategory= allIncomeCategory.map((data, key)=>{
      // console.log('Income Category: '+this.props.allIncomeCategory);
      // console.log('Expense Category: '+ this.props.allExpenseCategory) 
      return (
          <View key={key} style={styles.incomeCategoryContainer}>
     <Text>{data}</Text>
     <View style={styles.btnContainer}>
       <TouchableOpacity>
         <Text>Delete</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text>Edit</Text>
       </TouchableOpacity>
     </View>
          </View>
        )
      })
    //    console.log("child: "+this.props.modelState)
       return(
           <>
    <IncomeCategory incomeCategoryState={this.state.incomeCategoryState} IncomeCategoryModel={this.IncomeCategoryModel} fetchData={this.fetchData}/>
     <ExpenseCategory expenseCategoryState={this.state.expenseCategoryState} ExpenseCategoryModel={this.ExpenseCategoryModel} fetchExpenseCategory={this.fetchExpenseCategory} renderAllExpenseCategory={this.renderAllExpenseCategory}/>
      <Modal
          animationType='fade'
          transparent={false}
          visible={this.props.allCategoryState}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          >
            <ScrollView>
            <View style={styles.allIncomeCategory}>
            <Text style={styles.incomeCategoryText}>INCOME CATEGORY</Text>
             {incomeCategory}
             </View>
             </ScrollView>
             <ScrollView>
            <View style={styles.allExpenseCategory}>
            <Text style={styles.incomeCategoryText}>Expense CATEGORY</Text>
             {this.renderAllExpenseCategory()}
             </View>
             </ScrollView>

           
              <TouchableOpacity
                style={styles.incomeBtn}
                onPress={()=>this.IncomeCategoryModel(!this.state.incomeCategoryState)}>
                <Text style={styles.homeText}>ADD INCOME CATEGORY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.expenseBtn}
                onPress={() => {this.ExpenseCategoryModel(!this.state.expenseCategoryState)}}>
                <Text style={styles.homeText}>ADD EXPENSE CATEGORY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.homeBtn}
                onPress={() => this.props.setAllCategoryModel(!this.props.allCategoryState)}>
                <Text style={styles.homeText}>Home</Text>
              </TouchableOpacity>
           
        </Modal>
</>
       
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
    },
    add1: () => {
      dispatch(expenseCategoryAction())
    },
    
  }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(AllCategory);
// export default AllCategory;

   const styles = StyleSheet.create({
  
  homeBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnContainer:{
  flexDirection: 'row'
  },
  allIncomeCategory:{
   justifyContent: 'center',
   backgroundColor: 'lightblue',
   alignItems: 'center'
  },
  allExpenseCategory:{
    // marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    alignItems: 'center'
   },
  incomeCategoryText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'green'
  },
  incomeCategoryContainer:{
 flexDirection: 'row',
 justifyContent:'space-between',
 width: '100%',
 padding: 10
  },
  incomeBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2

  },
  expenseBtn:{
    width: '100%',
    height: 50,
    backgroundColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2

  },
  homeText: {
  color: '#fff',
  fontWeight: 'bold'
  },
  
});