import React, {Component} from 'react';
import request from 'superagent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Mui from '../data/mui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import style from '../../css/style.css';
const url = {
  req: 'http://seiji.kpi-net.com/api/',
  sample: 'http://seiji.kpi-net.com/api/?type=1&count=10&format=json'
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.ajax()
    this.ajax = this.ajax.bind(this);
    this.check = this.check.bind(this);
    this.state ={
      body: []
    }
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
    const list = this.state.body.map(body => {
      return (<Card>
        <CardHeader
          title={body.name}
          subtitle={body.yomi}
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <div></div>
        </CardText>
      </Card>
    )
    })
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <AppBar
            title="Title"
            />
          <div onClick={this.check}>state check</div>
          {list}
        </main>
      </MuiThemeProvider>
    )
  }
}
