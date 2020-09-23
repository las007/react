import React,{Component} from 'react';
import ConstRoute from "./routes"
import './App.less'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
        <div className="main">
            <ConstRoute />
        </div>
    );
  }
}

export default App;

// ReactDom.render(<App />,document.getElementById('root'));
