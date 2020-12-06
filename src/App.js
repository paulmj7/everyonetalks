import React, { Component } from "react";
import './App.css';

let circBuff = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2"];

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayText: [" "],
      option: "0"
    }
    this.handleChangeLetter = this.handleChangeLetter.bind(this);
    this.handleNextLetter = this.handleNextLetter.bind(this);
  }
  handleChangeLetter(event) {
    event.preventDefault();
    let letter = circBuff[0];
    circBuff.shift();
    circBuff.push(letter);
    if (letter === "1") {
      let tempText = this.state.displayText;
      tempText.pop();
      this.setState({ displayText: tempText, option: "1" });
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("delete letter"));
    } else if (letter === "2") {
      let tempText = this.state.displayText;
      this.setState({ displayText: tempText, option: "2" });
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("clear screen"));
    } else {
      let tempText = this.state.displayText;
      tempText[tempText.length-1] = letter;
      this.setState({ displayText: tempText });
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(letter));
    }
  }
  handleNextLetter(event) {
    event.preventDefault();
    if (this.state.option === "1") {
      let delText = this.state.displayText;
      delText[delText.length-1] = " ";
      this.setState({ displayText: delText, option: "0" });
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("success, current word is"));
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(delText.toString()));
    } else if (this.state.option === "2") {
      let clearText = [" "];
      this.setState({ displayText: clearText, option: "0" });
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("success, screen is cleared"));
    } else {
      let tempText = this.state.displayText;
      tempText.push(" ");
      this.setState({ displayText: tempText })
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(tempText.toString()));
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className="textbar">{this.state.displayText}</h1>
        <button className="button1" onClick={this.handleChangeLetter}>Letter</button>
        <button className="button2" onClick={this.handleNextLetter}>Space</button>
      </div>
    )
  }
}

export default App;