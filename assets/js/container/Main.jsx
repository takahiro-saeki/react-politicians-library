import React, {Component} from 'react';
import request from 'superagent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Mui from '../data/mui';
import style from '../../css/style.css';
const url = {
  req: 'http://seiji.kpi-net.com/api/',
  sample: 'http://seiji.kpi-net.com/api/?type=3&count=1&format=json'
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.ajax()
    this.ajax = this.ajax.bind(this);
    this.check = this.check.bind(this);
  }

  ajax() {
    request
    .get(url.sample)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        const data = res.text.replace(/\r?\n/g,"").trim();
        const politicians = (new Function("return " + data))();
        this.setState({
          body: politicians
        })
      }
    })
  }

  check() {
    console.log(this.state)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <AppBar
            title="Title"
            />
          <div onClick={this.check}>state check</div>
        </main>
      </MuiThemeProvider>
    )
  }
}