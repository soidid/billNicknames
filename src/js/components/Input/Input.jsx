/** @jsx React.DOM */
"use strict";
var React = require('react');

require("./Input.css");

var Input =
    React.createClass({
    
    
    render:function(){
    	/*
    	  對應上述方式，input 長相：

    	  第一種 <input onChange={this._onChange}/>
          第二種 <input ref="textInput" onChange={this._onChange}/>
          第三種 <input id="todo-input" ref="textInput" onChange={this._onChange}/>
    	*/
        var { handleInputChange, handleSetInput, currentTerm } = this.props;
        var examples = ['吳育昇條款','加薪四法', '公投', '罷免'];
        var exampleButtons = examples.map((item,key)=>{
            var boundClick = handleSetInput.bind(null, item);
            return <div className="Input-keyword"
                        onClick={boundClick}>{item}</div>;
        });

        var boundClearInput = handleSetInput.bind(null, "");
        var boundClearInputItem = (currentTerm) ? <div className="Input-clearInput"
                onClick={boundClearInput}>x</div> :"";
        
        return (
      	  <div className="Input">
          	<input className="Input-textInput"
                   onChange={handleInputChange}
                   placeholder={"搜尋議題或法案別名"}
          	       value={currentTerm}/>
                {boundClearInputItem}
            <div className="Input-hint">大家都在找：
                {exampleButtons}
            </div>
          </div>
        )
    }

  });
module.exports = Input;