import React from 'react';
import HelloReact from './HelloReact'
import Counter from '../counter/counter'

export default class Main extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  changeText(text) {
    this.setState({text: text});
  }

  handleChange(e) {
    const text = e.target.value;
    this.props.changeText(text);
  }

  render() {
    return(
      <main class="l-main">

        <HelloReact />

        <div>
          <p>{this.props.text}</p>
          <input onChange={this.handleChange}/>
        </div>

        <Counter />
      </main>
    )
  }
}