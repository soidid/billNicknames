/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Proposer = require('../Proposer/Proposer.jsx');

require("./Records.css");
var Records = React.createClass({
  
  render() {
    var {data, currentTerm} = this.props;
    console.log(data);
    

    var entries = data

    .filter((item)=>{
    	console.log(currentTerm);
    	if(currentTerm)
           return (item["term"].indexOf(currentTerm) !== -1)||(item["issue"].indexOf(currentTerm) !== -1);
        else
           return item;
    })
    .map((item,key)=>{
    	//每一筆 entry
    	var recordsEntryClass = "Records-entry "+"is-"+item.proposer.party_eng;
    	var titleClass = "Records-title "+"is-"+item.proposer.party_eng;

    	var nicknameItem = (item.term) ? 
    	        <div className="Records-flexItem">
        	        <div className="Records-flexLeft">法案別名</div>
        	        <div className="Records-flexMain">{item.term}</div>
                </div> : "";
        var link = "http://ly.g0v.tw/bills/" + item.bill_number;
        return (
        	<a className={recordsEntryClass}
        	   href={link}
        	   target="_blank">
        	    <div className={titleClass}>
        	        {item.issue}
                </div>
                {nicknameItem}
                <div className="Records-flexItem">
        	        <div className="Records-flexLeft">提案人</div>
        	        <div className="Records-flexMain"><Proposer data={item.proposer} /></div>
                </div>
                <div className="Records-flexItem">
        	        <div className="Records-flexLeft">提案摘要</div>
        	        <div className="Records-flexMain">{item.comment}</div>
                </div>
        	</a>
        )
    });
    return (
      <div className="Records">
        {entries}
      </div>
    );
  }
});


module.exports = Records;


