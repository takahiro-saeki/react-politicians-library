import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Main extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          
        </main>
      </MuiThemeProvider>
    )
  }
}
