import React from 'react';
import axios from 'axios';
import './App.css';
import './bootstrap.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFlipped: false,
      currentCollection: 0,
      currentCard: 0,
      collections: []
      // cards : [{'word':'Card 1', 'definition':'Aaron'}, {'word':'Card 2', 'definition':'Amanda'}, {'word':'Card 3', 'definition':'Heather'}]
    };
  }
  componentDidMount() {
    axios.get('https://localhost:44393/api/collection').then(response => {
      console.log(response)
      this.setState({
        collections: response.data,
        dataReady: true,
      })
    });
  }

  flipCard(){
    this.setState({isFlipped: this.state.isFlipped === true ? false: true});
  }



  nextCard(){
    if(this.state.currentCard + 1 > this.state.collections[this.state.currentCollection].cards.length - 1)
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
        currentCard: this.state.collections[this.state.currentCollection].cards.length - 1,
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

  nextCollection(){
    if(this.state.currentCollection + 1 > this.state.collections.length - 1)
    {
      this.setState({
        currentCollection: 0,
        currentCard: 0,
        isFlipped:false
      });
    }
    else
    {
      this.setState({
        currentCollection: this.state.currentCollection + 1,
        currentCard: 0,
        isFlipped:false
      });
    }
  }
  
  previousCollection(){
    if(this.state.currentCollection - 1 < 0)
    {
      this.setState({
        currentCollection: this.state.collections.length - 1,
        currentCard: 0,
        isFlipped:false
      });
    }
    else
    {
      this.setState({
        currentCollection: this.state.currentCollection - 1,
        currentCard: 0,
        isFlipped:false
      });
    }
  }

  render(){
    if(this.state.dataReady)
    {
      let thisCard = this.state.collections[this.state.currentCollection].cards[this.state.currentCard]
      let thisCollection = this.state.collections[this.state.currentCollection]
      return(
        <div className="row text-center">
          <div className="col-sm-2">

          </div>
          <div className="col-sm-8">
            <CardWindow
              isFlipped={this.state.isFlipped}
              currentCollection={this.state.currentCollection}
              currentCollectionTitle={thisCollection.title}
              currentCard={this.state.currentCard}
              currentCardWord={thisCard.word}
              currentCardDefinition={thisCard.definition}
              previousCollection={(i) => this.previousCollection(i)}
              nextCollection={(i) => this.nextCollection(i)}
              previousCard={(i) => this.previousCard(i)}
              nextCard={(i) => this.nextCard(i)}
              onClick={(i) => this.flipCard(i)}
            />
          </div>
          <div className="col-sm-2">

          </div>
        </div>
        );
    }
    else{
      return null;
    }
  }
}
function NextButton(props){
  return(
    <button onClick={() => props.onClick() } className = {"select-button"}>
      &#8594;
    </button>
  );
}

function PreviousButton(props){
  return(
    <button onClick={() => props.onClick()}  className = {"select-button"}>
      &#8592;
    </button>
  );
}

class CardWindow extends React.Component {

  render(i) {
    return (
      <div>
        <CollectionSelection
          title = {this.props.currentCollectionTitle}
          previousCollection =  {(i) => this.props.previousCollection(i)}
          nextCollection =  {(i) => this.props.nextCollection(i)}
        />
        <CardCollection
          isFlipped = {this.props.isFlipped}
          currentCollection = {this.props.currentCollection}
          currentCard = {this.props.currentCard}
          currentCardWord = {this.props.currentCardWord}
          currentCardDefinition = {this.props.currentCardDefinition}
          previousCard = {(i) => this.props.previousCard(i)}
          nextCard = {(i) => this.props.nextCard(i)}
          onClick = {(i) => this.props.onClick(i)}
        />
      </div>
    );
  }

}

class CollectionSelection extends React.Component
{
  render(i) {
    return (
      <div>
      <h2>Current Collection</h2>
        <div className="row">
          <div className="col-sm-2" padding="0">
            <PreviousButton
              className={"select-button"}
              onClick={(i) => this.props.previousCollection(i)}
            />
          </div>
          <div className="col-sm-8">
          <Collection
            title={this.props.title}
          />
          </div>
          <div className="col-sm-2">
          <NextButton
            className = {"select-button"}
            onClick={(i) => this.props.nextCollection(i)}
          />
          </div>
        </div>
      </div>
    );
  }
}

class CardCollection extends React.Component{

  render(i) {
    return (
      <div>
      <h2>Current Card</h2>
        <div className="row">
          <div className="col-sm-2">
          <PreviousButton
            onClick={(i) => this.props.previousCard(i)}
          />
          </div>
          <div className="col-sm-8">
          <Card
            word={this.props.currentCardWord}
            definition={this.props.currentCardDefinition}
            isFlipped={this.props.isFlipped}
            onClick={() => this.props.onClick(i)}
          />
          </div>
          <div className="col-sm-2">
          <NextButton
            className = {"select-button"}
            onClick={(i) => this.props.nextCard(i)}
          />
          </div>
        </div>
      </div>
    );
  }
}

function Collection(props)
{
  return(
    <div className="flip-card card-box">
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

function Card(props) {
  if (!props.isFlipped) {
    return (
      <div className="flip-card card-box" onClick={props.onClick}>
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
      <div className="flip-card card-box" onClick={() => props.onClick()}>
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
