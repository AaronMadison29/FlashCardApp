import React from 'react';
import './App.css';
import './bootstrap.css';

class App extends React.Component {
  constructor(){
    super(props);
    this.state = {
      isFlipped: false,
      currentCard: 0,
      data : [{'title':'Card 1', 'name':'Aaron'}, {'title':'Card 2', 'name':'Amanda'}, {'title':'Card 3', 'name':'Heather'}]
    };
  }
  render(){
    return(
      <CardWindow 
        isFlipped = {this.state.isFlipped}
        currentCard = {this.state.currentCard}
      />);
  }
}

class CardWindow extends React.Component {

  render() {
    return (
      <div className="row">
        <Card
        id= {this.props.currentCard}
        isFlipped = {this.props.isFlipped}
        />
      </div>
    );
  }

}

function Card(props){
  if (this.props.isFlipped) {
    return (
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-back">
          </div>
        </div>
      </div>
    )
  }
}

export default App;
