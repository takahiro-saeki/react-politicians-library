import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import request from 'superagent';
import uuid from 'node-uuid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../component/Header';
import Divider from 'material-ui/Divider';
import Mui from '../data/mui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import style from '../../css/style.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import listItems from '../data/listItems';
import RaisedButton from 'material-ui/RaisedButton';
//後程削除
const url = {
  req: 'http://seiji.kpi-net.com/api/',
  sample: 'http://seiji.kpi-net.com/api/?type=1&count=10&format=json'
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state ={
      body: [],
      count: 10,
      type: 1
    }
    this.typeChange = this.typeChange.bind(this);
    this.location = this.location.bind(this);
    this.countChange = this.countChange.bind(this);
    this.countDefault = this.countDefault.bind(this);
    this.countDefault();
    this.check()
  }

  //政党、地域での絞り込みの為の確認
  check() {
    request
    .get(`${url.req}?type=1&count=900&format=json`)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        const data = res.text.replace(/\r?\n/g,"").trim();
        const politicians = (new Function("return " + data))();
        console.log(politicians)
        const jimin = [];
        const koumei = [];
        const dp = [];
        const other = []
        politicians.map(poli => {
          switch(poli.seitou) {
            case '自民党':
              return jimin.push(poli)
            case '公明党':
              return koumei.push(poli)
            case '民主党':
              return dp.push(poli)
            default:
              return other.push(poli)
          }
        })
        console.log(jimin)
        console.log(koumei)
        console.log(dp)
        console.log(other)
      }
    })
  }

  countDefault() {
    localStorage.setItem('count', this.state.count);
  }

  typeChange(event, index, value) {
    this.setState({type: value})
  }

  countChange(event, index, value) {
    this.setState({count: value})
    localStorage.setItem('count', value);
  }

  location() {
    browserHistory.push(`/${this.state.type}`)
  }

  render() {
    const selectItems = listItems.map(item => {
      return <MenuItem value={item.id} key={uuid.v4()} primaryText={item.type} />
    })
    const box = []
    for(let i = 1; i < 10; i++) {
      box.push(<MenuItem value={Number(`${i}00`)} key={uuid.v4()} primaryText={`${i}00件の表示`} />)
    }

    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page="議員検索" leftIcon={false} />
          <section style={{padding: '1rem'}}>
            <SelectField
              floatingLabelText="種類"
              floatingLabelFixed={true}
              value={this.state.type}
              onChange={this.typeChange}
              maxHeight={200}
              fullWidth={true}>
              {selectItems}
            </SelectField>
            <SelectField
              floatingLabelText="表示件数"
              floatingLabelFixed={true}
              value={this.state.count}
              onChange={this.countChange}
              maxHeight={200}
              fullWidth={true}>
              {box}
            </SelectField>
            <RaisedButton
              label="検索する"
              primary={true}
              fullWidth={true}
              style={{margin: '1rem auto'}}
              onClick={this.location}
              />
          </section>
        </main>
      </MuiThemeProvider>
    )
  }
}
