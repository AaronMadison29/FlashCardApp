import React from 'react';
import axios from 'axios';
import ApiCards from './Components/FlashCards'
import './App.css';
import './bootstrap.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFlipped: false,
      currentCard: 0,
      cards: ApiCards
      // cards : [{'word':'Card 1', 'definition':'Aaron'}, {'word':'Card 2', 'definition':'Amanda'}, {'word':'Card 3', 'definition':'Heather'}]
    };
  }

  flipCard(){
    this.setState({isFlipped: this.state.isFlipped === true ? false: true});
  }

  nextCard(){
    if(this.state.currentCard + 1 > this.state.cards.length - 1)
    {
      this.setState({
        currentCard: 0,
        isFlipped:false
      });
    }
    else
    {
      this.setState({
        currentCard: this.state.currentCard + 1,
        isFlipped:false
      });
    }
  }

  previousCard(){
    if(this.state.currentCard - 1 < 0)
    {
      this.setState({
        currentCard: this.state.cards.length - 1,
        isFlipped:false
      });
    }
    else
    {
      this.setState({
        currentCard: this.state.currentCard - 1,
        isFlipped:false
      });
    }
  }
  render(){
    return(
      <div>
      <CardWindow 
        isFlipped = {this.state.isFlipped}
        currentCardWord = {this.state.cards[this.state.currentCard].word}
        currentCardDefinition = {this.state.cards[this.state.currentCard].definition}
        onClick = {(i) => this.flipCard(i)}
      />
      <PreviousCardButton
      onClick = {(i) => this.previousCard(i)}
      />
      <NextCardButton
      onClick = {(i) => this.nextCard(i)}
      />
      </div>
      );
  }
}
function NextCardButton(props){
  return(
    <button onClick={() => props.onClick()}>
      &#8594;
    </button>
  );
}

function PreviousCardButton(props){
  return(
    <button onClick={() => props.onClick()}>
      &#8592;
    </button>
  );
}

class CardWindow extends React.Component {

  render(i) {
    return (
      <div className="row">
        <Card
        word={this.props.currentCardWord}
        definition={this.props.currentCardDefinition}
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
            {props.word}
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
            {props.definition}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
