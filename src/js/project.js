import $ from 'jquery';
import { $WINDOW } from './helpers';
//import _debounce from 'lodash.debounce';

// modules
import HelloWorld from './modules/hello_world';


export default class {

  constructor(el) {
    this.$el = $(el);

    this.modules = {
      helloWorld: new HelloWorld('.hello')
    };

    this.initialize();
    this.bind();
  }

  initialize() {

  }

  bind() {

  }
}