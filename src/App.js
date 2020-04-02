import React from 'react';
import './App.css';
import './bootstrap.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFlipped: false,
      currentCard: 0,
      data : [{'title':'Card 1', 'name':'Aaron'}, {'title':'Card 2', 'name':'Amanda'}, {'title':'Card 3', 'name':'Heather'}]
    };
  }

  flipCard(){
    this.setState({isFlipped: this.state.isFlipped === true ? false: true});
  }



  render(){
    return(
      <CardWindow 
        isFlipped = {this.state.isFlipped}
        currentCardTitle = {this.state.data[this.state.currentCard].title}
        currentCardName = {this.state.data[this.state.currentCard].name}
        onClick = {(i) => this.flipCard(i)}
      />);
  }
}

class CardWindow extends React.Component {

  render(i) {
    return (
      <div className="row">
        <Card
        title={this.props.currentCardTitle}
        name={this.props.currentCardName}
        isFlipped = {this.props.isFlipped}
        onClick= {() => this.props.onClick(i)}
        />
      </div>
    );
  }

}

function Card(props) {
  if (!props.isFlipped) {
    return (
      <div className="flip-card" onClick={props.onClick}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h1>
            {props.title}
            </h1>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="flip-card" onClick={() => props.onClick()}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {props.name}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
