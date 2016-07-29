import React, {Component} from 'react';
import {render} from 'react-dom';

class Test extends Component {
  render() {
    return (
      <div>テスト</div>
    )
  }
}

render(
  <Test />,
  document.getElementById('app')
)
