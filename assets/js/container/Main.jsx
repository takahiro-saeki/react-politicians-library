import React, {Component} from 'react';
import request from 'superagent';
import uuid from 'node-uuid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
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
      return (
        <Card key={uuid.v4()}>
          <CardHeader
            title={body.name}
            subtitle={body.yomi}
            actAsExpander={true}
            showExpandableButton={true}
            />
          <CardText expandable={true}>
            <Divider />
            <section className={style.resultContainer}>
              <div className={style.resultHeading}>地域</div>
              <div className={style.resultContent}>{body.area}</div>
            </section>
            <Divider />
            <section className={style.resultContainer}>
              <div className={style.resultHeading}>カテゴリー</div>
              <div className={style.resultContent}>{body.category}</div>
            </section>
            <Divider />
            <section className={style.resultContainer}>
              <div className={style.resultHeading}>政党</div>
              <div className={style.resultContent}>{body.seitou}</div>
            </section>
            <Divider />
            <section className={style.resultContainer}>
              <div className={style.resultHeading}>誕生日</div>
              <div className={style.resultContent}>{body.birth}</div>
            </section>
            <Divider />
            <section className={style.resultContainer}>
              <div className={style.resultHeading}>当選回数</div>
              <div className={style.resultContent}>{body.tousen_kaisu}</div>
            </section>
            <Divider />
            <section className={style.resultContainer}>
              <div className={style.resultHeading}>{body.linkname}</div>
              <div className={style.resultContent}>{body.link}</div>
            </section>
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
          <div onClick={this.check} style={{padding: '1rem'}}>state check</div>
          {list}
        </main>
      </MuiThemeProvider>
    )
  }
}
