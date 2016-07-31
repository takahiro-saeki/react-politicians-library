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
  }

  countDefault() {
    localStorage.setItem('party', this.state.party);
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
