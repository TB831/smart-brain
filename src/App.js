import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import './App.css';
import 'tachyons';

const clarifai = new Clarifai.App({
 apiKey: 'e1424d3a9deb43588f7ddfcacddb7e6f'
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    clarifai.models
      .predict(Clarifai.FACE_DETECT_MODEL,
        this.state.input).then(
          function(response) {
            console.log(response.outputs[0].data.regions[0].region_info.bounding_box); //Response from the Clarifai
          },
          function(err) {
            console.log(err);
          }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params = {particlesOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange = {this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
};

export default App;
