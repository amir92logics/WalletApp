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
  View,Alert,Image, TouchableNativeFeedbackBase
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
      this.deleteExpenseCategory = this.deleteExpenseCategory.bind(this);
      this.deleteIncomeCategory = this.deleteIncomeCategory.bind(this);
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
        // console.log("Database open Now!");
        // db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS Income_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
      }).then(() => {
        console.log('database created successfully!!!')
      }).catch(error => {
          console.log(error);
      });
        db.transaction((tx) => {
        tx.executeSql(
         'SELECT * FROM Income_Category',
         [],
         (tx, results) => {
           var len = results.rows.length;
           // var len = results.rows.length;
           var record =[];
           for (let i = 0; i < len; i++) {
                var row = results.rows.item(i);
                // var id = row.id;
                // console.log("row.id",row.id)
                for (let j = row.id; j === row.id ; j++) {
                record.push(
                  <View key={j} style={styles.incomeCategoryContainer}>
                  <Text>{(row.category.length > 10)? row.category.substring(0,10):row.category}</Text>
                  <View style={styles.btnContainer} >
                    <TouchableOpacity  onPress={(e)=>this.deleteIncomeCategory(e,j)}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                   
                  </View>
                       </View>
                    )
                }
              }
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
      
          tx.executeSql('CREATE TABLE IF NOT EXISTS Expense_Category(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20), description VARCHAR(255))');
        }).then(() => {
          console.log('database created successfully!!!')
        }).catch(error => {
            console.log(error);
        });
          db.transaction((tx) => {
            tx.executeSql(
         'SELECT * FROM Expense_Category',
         [],
         (tx, results) => {
           var len = results.rows.length;
           // var len = results.rows.length;
           var record =[];
           for (let i = 0; i < len; i++) {
                var row = results.rows.item(i);
                // var id = row.id;
                // console.log("row.id",row.id)
                for (let j = row.id; j === row.id ; j++) {
                record.push(
                <View key={j} style={styles.incomeCategoryContainer}>
        
                <Text>{(row.category.length > 10)? row.category.substring(0,10):row.category}</Text>
                
                <View style={styles.btnContainer}>
                <TouchableOpacity key={i} onPress={(e)=>this.deleteExpenseCategory(e,j)}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
                     </View>
                    )
                }
                // }
                // })
            }
            this.setState({allExpenseCategory: record});
          //  console.log('record',record);
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
 deleteIncomeCategory=(e, id)=>{
  console.log(id)
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);
  
  SQLite.openDatabase({
      name: "WalletApp",
      location: "default"
  }).then((db) => {
   db.transaction((tx) => {
      // console.log("Database open!");
      tx.executeSql(
        'DELETE FROM  Income_Category WHERE id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            this.notifyMessage("Category deleted successfully!!!")
            // this.setState({allExpenseCategory:[]})
          }else{
              this.notifyMessage("Failed to delete Category!!!")
          
         }
       }
     );
     });
  });
  this.fetchData(); 
   }
  
   renderAllExpenseCategory=()=>{
    // this.props.allIncomeCategory;
    const {allExpenseCategory}= this.state;
    console.log("allExpenseCategory: ",allExpenseCategory)
    return(
    <>
   {allExpenseCategory.map((data, key)=>{
     console.log("data: ",data)
      return(
        <View key={key}>
         {data}
         </View>
      )
        })
   }
   </>
   );
   }
 deleteExpenseCategory=(e, id)=>{
console.log(id)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

SQLite.openDatabase({
    name: "WalletApp",
    location: "default"
}).then((db) => {
 db.transaction((tx) => {
    // console.log("Database open!");
    tx.executeSql(
      'DELETE FROM  Expense_Category WHERE id=?',
      [id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          this.notifyMessage("Category deleted successfully!!!")
          // this.setState({allExpenseCategory:[]})
        }else{
            this.notifyMessage("Failed to delete Category!!!")
        
       }
     }
   );
   });
});
this.fetchExpenseCategory(); 
 }

 renderAllExpenseCategory=()=>{
  // this.props.allIncomeCategory;
  const {allExpenseCategory}= this.state;
  console.log("allExpenseCategory: ",allExpenseCategory)
  return(
  <>
 {allExpenseCategory.map((data, key)=>{
   console.log("data: ",data)
    return(
      <View key={key}>
       {data}
       </View>
    )
      })
 }
 </>
 );
 }
   render(){
    var str = 'Some very long string';
    if(str.length > 10) str = str.substring(0,10);
     console.log('str: '+ str)
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
               <View style={styles.allCategory}>
                 <View style={{justifyContent: 'center', alignItems: 'center'}}>
               <Text style={styles.incomeCategoryText}>INCOME CATEGORY LIST</Text>
               </View>
            <ScrollView>
            <View style={styles.allIncomeCategory}>
             {this.state.allIncomeCategory}
             </View>
             </ScrollView>
             <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
             <Text style={styles.expenseCategoryText}>EXPENSE CATEGORY LIST</Text>
             </View>
             <ScrollView>
            <View style={styles.allExpenseCategory}>
             {this.state.allExpenseCategory}
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
              </View>
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
  allCategory:{
    flex: 1,
    justifyContent:'space-between',
   backgroundColor: 'lightblue',
  },
  btnContainer:{
  flexDirection: 'row',
  backgroundColor: '#d9534f',
  borderRadius: 5,
  height:30,
  width:60,
  justifyContent: 'center',
  alignItems: 'center'
  },
  allIncomeCategory:{
   justifyContent: 'center',
  
   alignItems: 'center'
  },
  allExpenseCategory:{
    // marginTop: 10,
    justifyContent: 'center',
    // backgroundColor: 'lightgreen',
    alignItems: 'center'
   },
  incomeCategoryText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5cb85c',
    borderBottomWidth: 2,
    borderBottomColor: '#5cb85c',


  },
  expenseCategoryText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#d9534f',
    borderBottomWidth: 2,
    borderBottomColor: '#d9534f',

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