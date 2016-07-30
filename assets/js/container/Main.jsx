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
      box.push(<MenuItem value={Number(`${i}0`)} key={uuid.v4()} primaryText={`${i}0件の表示`} />)
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
