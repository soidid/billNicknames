/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
require("./Legislators.css");

var Legislators = React.createClass({
  
  render() {

    //var data = this.props.data;
    var groupFilter = this.props.currentGroup;
    //console.log(groupFilter);
   
    // 支持
    var legiItemsFor = this.props.data
    .filter((item)=>{
        return (item);
    })
    .map((item, key)=>{

        var imgURL = require("./images/avatar/"+item.name+".png");
        var partyClass = "Legislators-avatar is-"+item.party_eng;
        return (
          <div className="Legislators-item">
          <div className={partyClass}
               key={key}>
            <img className="Legislators-avatarImg"
                 src={imgURL} />
            <div>{item.name}</div>
          </div>
          <div className="Legislators-hoverInfo">
              <div>選區：{item.constituency}</div>
              <div>範圍：{item.constituency_area} {item.constituency_detail}</div>
          </div>
          </div>
        )
    });
    
    return (
      <div className="Legislators">
       
        <div className="Legislators-group">
            
            {legiItemsFor}
        </div>
       
      </div>
    );
  }
});


module.exports = Legislators;


