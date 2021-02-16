import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Tooltip from './components/Tooltip';
import Home from './components/pages/Home';
import Edit from './components/pages/Edit';
import Saved from './components/pages/Saved';
import Search from './components/pages/Search';
import Footer from './components/Footer'
import Banner from './components/Banner'

function App({ children }) {
  return (

    <div className='App'>
      <Router>
        <Banner />
        <Tooltip />
        <Switch>
          <Route exact path={['/', '/Home']}>
            <Home />
          </Route>
          <Route exact path='/Search'>
            <Search />
          </Route>
          <Route exact path='/Saved'>
            <Saved />
          </Route>
          <Route exact path='/Edit'>
            <Edit />
          </Route>

        </Switch>

      </Router>
      <Footer />
    </div>
  );
}

export default App;