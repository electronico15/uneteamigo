import logo from './logo.svg';
import './App.css';
import { Outlet } from "react-router-dom";
import { Button, Container, Col ,Row } from 'reactstrap';


function App() {
  return (
<Container fluid="sm" lg="8">

  <Outlet />
</Container>
  );
}

export default App;
