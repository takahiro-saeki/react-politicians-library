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
import party from '../data/party';
import partyName from '../data/partyName';
//後程削除
const url = {
  req: 'http://seiji.kpi-net.com/api/',
  sample: 'http://seiji.kpi-net.com/api/?type=4&count=10&format=json'
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state ={
      body: [],
      party: '自民党',
      type: 1
    }
    this.typeChange = this.typeChange.bind(this);
    this.location = this.location.bind(this);
    this.partyChange = this.partyChange.bind(this);
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
        //console.log(politicians)
        const other = [];
        politicians.map(poli => {
          switch(poli.seitou) {
            case party.jimin.name:
              return party.jimin.data.push(poli)
            case party.koumei.name:
              return party.koumei.data.push(poli)
            case party.dp.name:
              return party.dp.data.push(poli)
            case party.seikatsu.name:
              return party.seikatsu.data.push(poli)
            case party.independents.name:
              return party.independents.data.push(poli)
            case party.ishin.name:
              return party.ishin.data.push(poli)
            case party.everybody.name:
              return party.everybody.data.push(poli)
            case party.UnityParty.name:
              return party.UnityParty.data.push(poli)
            case party.green.name:
              return party.green.data.push(poli)
            case party.syamin.name:
              return party.syamin.data.push(poli)
            case party.kyousan.name:
              return party.kyousan.data.push(poli)
            case party.shintou.name:
              return party.shintou.data.push(poli)
            default:
              return other.push(poli)
          }
        })
        console.log(party.jimin.data)
        console.log(party.koumei.data)
        console.log(party.dp.data)
        console.log(party.seikatsu.data)
        console.log(party.independents.data)
        console.log(party.ishin.data)
        console.log(party.everybody.data)
        console.log(party.UnityParty.data)
        console.log(party.green.data)
        console.log(party.syamin.data)
        console.log(party.kyousan.data)
        console.log(party.shintou.data)
        if(other.length !== 0) {
          console.log(other)
        }
      }
    })
  }

  countDefault() {
    localStorage.setItem('count', this.state.count);
  }

  typeChange(event, index, value) {
    this.setState({type: value})
  }

  partyChange(event, index, value) {
    this.setState({party: value})
    localStorage.setItem('party', value);
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

    const partyList = partyName.map(partyName => {
      return <MenuItem value={partyName.name} key={uuid.v4()} primaryText={partyName.name} />
    })

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
              value={this.state.party}
              onChange={this.partyChange}
              maxHeight={200}
              fullWidth={true}>
              {partyList}
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
