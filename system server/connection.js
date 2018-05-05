'use strict';


var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// client.indices.create({  
//   index: 'gov'
// },function(err,resp,status) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log("create",resp);
//   }
// });


client.index({  
  index: 'gov',
  id: '1',
  type: 'constituencies',
  body: {
    "ConstituencyName": "Ipswich",
    "ConstituencyID": "E14000761",
    "ConstituencyType": "Borough",
    "Electorate": 74499,
    "ValidVotes": 48694,
  }
},function(err,resp,status) {
    console.log(resp);
});

client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {  
  console.log("constituencies",resp);
});

// client.delete({  
//   index: 'gov',
//   id: '1',
//   type: 'constituencies'
// },function(err,resp,status) {
//     console.log(resp);
// });
// client.count({index: 'gov',type: 'constituencies'},function(err,resp,status) {  
//   console.log("constituencies",resp);
// });


client.search({  
  index: 'gov',
  type: 'constituencies',
  body: {
    query: {
      match: { "constituencyname": "Harwich" }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});

module.exports = client;