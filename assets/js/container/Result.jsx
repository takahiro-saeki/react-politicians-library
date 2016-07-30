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

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state ={
      body: []
    }
    this.ajax()
    this.ajax = this.ajax.bind(this);
    this.typeCheck = this.typeCheck.bind(this);
  }

  ajax() {
    request
    .get(`${url.req}?type=${this.props.params.type}&count=10&format=json`)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        const data = res.text.replace(/\r?\n/g,"").trim();
        const politicians = (new Function("return " + data))();
        console.log(politicians)
        this.setState({
          body: politicians
        })
      }
    })
  }

  typeCheck() {
    switch(this.props.params.type) {
      case '1':
      return '衆議院議員'
      case '2':
      return '参議院議員'
      case '3':
      return '知事'
      case '4':
      return '市長'
      case '5':
      return '区長'
      case '6':
      return '町長'
      case '7':
      return '村長'
      default:
      return '不正な値です'
    }
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
            {(() => {
              if(this.props.params.type < 3) {
                return (
              <div>
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
              </div>)
              }
            })()}
          </CardText>
        </Card>
      )
    })
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page={`検索結果：${this.typeCheck()}`} leftIcon={true} />
          {list}
        </main>
      </MuiThemeProvider>
    )
  }
}
