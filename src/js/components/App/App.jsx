/** @jsx React.DOM */
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

var React = require('react/addons');

var Input = require('../Input/Input.jsx');
var Records = require('../Records/Records.jsx');

require('./App.css');

function getData(){
  // Change from Object to Array;
  var data = AppStore.getData();
  var legiData = Object.keys(data).map((value, key)=>{
      return data[value];
  });
  return legiData;
}

var App = React.createClass({

  getInitialState(){
    return {
      data: [],
      currentTerm: ""
    }
  },
  
  componentWillMount () {
      this._onChange();
      React.initializeTouchEvents(true);
  },

  componentDidMount () {
      window.addEventListener("resize", this._onSetSize);
      AppStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount () {
      window.removeEventListener("resize", this._onSetSize);
      AppStore.removeChangeListener(this._onChange);
  },
  
  _onChange (){
      this.setState({
         data: getData()
      });

  },
      

  _onTouchStart(event){
    this.setState({
      touchStartX: event.touches[0].clientX,
      touchStartY: event.touches[0].clientY
    });
  },


  _onTouchEnd(event){
    var state = this.state;
    var moveX = state.touchEndX - state.touchStartX;
    var moveY = state.touchEndY - state.touchStartY;
   
    currentIndex = state.currentIndex;

    //console.log("x:"+Math.abs(moveX)+", y:"+Math.abs(moveY));
    // 40 is threshold
    if(Math.abs(moveX) < 40 || Math.abs(moveY) > 50){
       return;

    }
    // Slide Direction
    if(moveX > 0){//toggle Prev
        //currentIndex = this._getPreIndex(currentIndex);
    
    }else{//toggle Next
        //currentIndex = this._getNextIndex(currentIndex);
       
    }
    
    // this.setState({
    //   currentIndex: currentIndex
    // });
    
  },

  _onTouchMove(event){
    this.setState({
        touchEndX: event.touches[0].clientX,
        touchEndY: event.touches[0].clientY
    });
  },

  _onInputChange(event){
      /*
        取得 input 的輸入值得方式有幾種

        第一種：透過 event.target 取得值
        event.target.value

        第二種：透過 refs 取得值
        this.refs.textInput.getDOMNode().value
        
        第三種：透過 id 或 class 取得，用 js 或 jQuery 的方式去抓
        例如 Jeremy 的範例是在 componet mount 之後，綁定
        componentDidMount: function(){
          this.$input = $('#todo-input');
        }
        
        */  
        this.setState({
          currentTerm: event.target.value
        });
    },

  _onSetInput(value){
      this.setState({
          currentTerm: value
      });

  },

  render () {
    var { data, currentTerm } = this.state;
    
    //http://ly.g0v.tw/bills/1574L17305
    
    return (
      <div className="App"
           onTouchStart={this._onTouchStart}
           onTouchEnd={this._onTouchEnd}
           onTouchMove={this._onTouchMove}>
        
        <Input handleInputChange={this._onInputChange}
               handleSetInput={this._onSetInput}
               currentTerm={currentTerm}/>
        <Records data={data}
                 currentTerm={currentTerm} />
        

      </div>
    );
  }
});

module.exports = App;


