// import React from 'react';
import SQLite from 'react-native-sqlite-storage';
var record = []
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
      //  var record =[];
       for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
         
            record.push(row.category)
           
        }
        // this.props.add5(record);

        // this.setState({allIncomeCategory: record});
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
export default IncomeCategoryArray=record;