import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import request from 'superagent';
import uuid from 'node-uuid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../component/Header';
import Mui from '../data/mui';
import style from '../../css/style.css';
import listItems from '../data/listItems';
import partyName from '../data/partyName';
import inlineStyle from '../data/inlineStyle';

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
              floatingLabelText="政党名"
              floatingLabelFixed={true}
              value={this.state.party}
              onChange={this.partyChange}
              maxHeight={200}
              fullWidth={true}>
              {partyList}
            </SelectField>
            <RaisedButton
              label="検索する"
              fullWidth={true}
              style={inlineStyle.btn}
              backgroundColor={inlineStyle.btnBg}
              labelColor={inlineStyle.btnColor}
              onClick={this.location}
              />
          </section>
        </main>
      </MuiThemeProvider>
    )
  }
}
