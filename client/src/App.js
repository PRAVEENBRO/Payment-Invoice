
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import InvoiceForm from './components/invoice/InvoiceForm';
import Products from './components/invoice/Products';
import Paymentpage from './components/invoice/Paymentpage';
import NavigationBar from './components/NavigationBar';
import Invoice from './components/invoice/invoice';

function App() {
  return (
    <>
      <NavigationBar />

      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/InvoiceForm" component={InvoiceForm} />
        <Route exact path="/Paymentpage" component={Paymentpage} />
        <Route exact path="/invoice" component={Invoice} />
      </Switch>

    </>
  );
}

export default App;
