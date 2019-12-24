// import React from 'react';
import SQLite from 'react-native-sqlite-storage';
console.log('Expense category called')
var record = []
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
       
       for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
         
            record.push(row.category)
           
        }
        if (len > 0) {
         // console.log(results.rows.item(0).category);
        
       }else{
         // console.log('No user found');
        
       }
     }
   );
   });
});
export default ExpenseCategoryArray=record;