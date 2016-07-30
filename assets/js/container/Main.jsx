import React, {Component} from 'react';
import request from 'superagent';
import uuid from 'node-uuid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../component/Header';
import Divider from 'material-ui/Divider';
import Mui from '../data/mui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import style from '../../css/style.css';
import url from '../data/url';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import listItems from '../data/listItems';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.ajax()
    this.ajax = this.ajax.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.state ={
      body: [],
      count: 1,
      type: 1
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

  typeChange(event, index, value) {
    this.setState(() => this.state.type = value)
  }

  render() {
    const selectItems = listItems.map(item => {
      return <MenuItem value={item.id} key={uuid.v4()} primaryText={item.type} />
    })

    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page="議員検索" leftIcon={false} />
          <section style={{padding: '1rem'}}>
          <SelectField value={this.state.type} onChange={this.typeChange} maxHeight={200} fullWidth={true}>
            {selectItems}
          </SelectField>
        </section>
        </main>
      </MuiThemeProvider>
    )
  }
}
