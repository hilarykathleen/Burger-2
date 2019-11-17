var connection = require("../config/connection");

// helper functions 
function createQmarks(num) {
    var arr = []; //create empty array
    for (var i = 0; i < num; i++) { // fill it with loops of question marks
      arr.push("?");
    }
    return arr.toString(); // return the array to a string
  }
  
  // helper that will translate the string to sql
  function translateSql(ob) {
    var arr = [];
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'"; // creates our string and concatonates values
        }
        //push array
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
  }

var orm = {
    selectAll: function(table, cb) {
      var dbQuery = "SELECT * FROM " + table + ";";
  
      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    insertOne: function(table, cols, vals, cb) {
      var dbQuery =
        "INSERT INTO " +
        table +
        " (" +
        cols.toString() +
        ") " +
        "VALUES (" +
        createQmarks(vals.length) +
        ") ";
  
      console.log(dbQuery);
      connection.query(dbQuery, vals, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    updateOne: function(table, objColVals, condition, cb) {
      var dbQuery =
        "UPDATE " +
        table +
        " SET " +
        translateSql(objColVals) +
        " WHERE " +
        condition;
  
      console.log(dbQuery);
  
      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    },
    deleteOne: function(table, condition, cb) {
      var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
      console.log(dbQuery);
  
      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    }
  };
  module.exports = orm;