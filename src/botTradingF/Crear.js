import {
  Row,
  Col,
  Form,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  Card,
  CardBody,
  Input,
  Badge,
  Tooltip as RSTooltip,
  Alert,
  InputGroup,
  InputGroupText
} from 'reactstrap'

import ModalPersonalizado from '../componentesPeresonalisados/modalPersonalisado'
import React, { useState } from 'react'

const Crear = () => {
  const [modalAbierto, setModalAbierto] = useState(false)

  const toggleModal = () => {
    setModalAbierto(!modalAbierto)
  }

  return (
    <>
      <Card body className='my-2' style={{}}>
        <CardTitle tag='h5'>Grid de Futuros Futuros Populares</CardTitle>
        <CardText>
          Con la actualización del Grid, aprovecha el apalancamiento para
          amplificar los márgenes y las ganancias.
        </CardText>
        <Button color='primary' onClick={toggleModal}>
          +Crear
        </Button>
      </Card>

      <Card body className='my-2' style={{}}>
        <CardTitle tag='h5'>Spot Grid</CardTitle>
        <CardText>
          Compra automática a la baja y vende a la alta, aprovecha cada ventana
          de arbitraje en un mercado volátil.
        </CardText>
        <Button color='primary'>+Crear</Button>
      </Card>

      <Card body className='my-2' style={{}}>
        <CardTitle tag='h5'>Spot infinity Grid</CardTitle>
        <CardText>
          Spot Grid avanzado, arbitraje continuo sin límites máximos.
        </CardText>
        <Button color='primary'>+Crear</Button>
      </Card>
      <ModalPersonalizado
        isOpen={modalAbierto}
        toggle={toggleModal}
        title='Título del modal'
        body={<CardData />}
      />
    </>
  )
}

function CardData (props) {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <>
      <Card className='my-2'>
        <CardBody>
          <CardTitle tag='h3'> {props.Title}</CardTitle>

          <Nav tabs>
            <NavItem>
              <NavLink
                className={{ active: activeTab === '1' }}
                onClick={() => {
                  toggle('1')
                }}
              >
                Auto
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={{ active: activeTab === '2' }}
                onClick={() => {
                  toggle('2')
                }}
              >
                Manual
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <Auto />
            </TabPane>
            <TabPane tabId='2'>
              <Manual />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}

const IconTooltipInfo = ({ target, text }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)

  return (
    <>
      <i
        id={target}
        className='bi bi-info-circle'
        style={{ color: '#d7dde9' }}
      ></i>
      <RSTooltip
        placement='right'
        target={target}
        isOpen={tooltipOpen}
        toggle={toggle}
      >
        {text}
      </RSTooltip>
    </>
  )
}

function LavelRingLeft (props) {
  const { colRing, colLeft, ...rest } = props

  return (
    <Row className='rowLavelRingLeft'>
      <Col xs={rest.xsRing || '7'} className=''>
        {colRing}
      </Col>
      <Col xs={rest.xsLeft || '5'}>{colLeft}</Col>
    </Row>
  )
}

const Auto = () => {
  const pares = ['ETH/USD', 'LTC/USD', 'XRP/USD', 'BCH/USD']
  const [parSeleccionado, setParSeleccionado] = useState('')
  const [estrategia, setEstrategia] = useState('Neutral')
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggle = () => setTooltipOpen(!tooltipOpen)

  const handleChange = event => {
    setParSeleccionado(event.target.value)
    //alert(event.target.value)
  }

  const handleEstrategiaChange = e => {
    setEstrategia(e.target.text)
  }

  return (
    <>
      <Form>
        <Row className='row-cols-lg-auto g-3 align-items-center my-1'>
          <Col>
            <label htmlFor='pares'>Pares:</label>
            <select id='pares' value={parSeleccionado} onChange={handleChange}>
              <option value='BTC/USDT'>BTC/USDT</option>
              {pares.map(par => (
                <option key={par} value={par}>
                  {par}
                </option>
              ))}
            </select>
          </Col>

          <Col>
            <Badge color='info' className='elementoright'>
              New5 <smal>123</smal>
            </Badge>
          </Col>
        </Row>

        <Row id='estrategia'>
          <Nav
            pills
            fill
            className='bord5px my-1 gap-2 p-1 small bg-primary rounded-5 shadow-sm'
            style={{
              '--bs-nav-link-color': 'var(--bs-white)',
              '--bs-nav-pills-link-active-color': 'var(--bs-primary)',
              '--bs-nav-pills-link-active-bg': 'var(--bs-white)'
            }}
          >
            <NavItem>
              <NavLink
                href='#'
                active={estrategia === 'Neutral'}
                onClick={handleEstrategiaChange}
                className='rounded-3'
              >
                Neutral
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href='#'
                active={estrategia === 'Long'}
                onClick={handleEstrategiaChange}
                className='rounded-3'
              >
                Long
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href='#'
                active={estrategia === 'Short'}
                onClick={handleEstrategiaChange}
                className='rounded-3'
              >
                Short
              </NavLink>
            </NavItem>
            <NavItem>
              <IconTooltipInfo
                target='tooltip1'
                text='Grid de Futuros :
Neutral -  Adecuado para criptomonedas fluctuando dentro de un rango y no se abrirá ninguna posición inicial.
Long -  - Adecuado para criptomonedas con movimientos ascendentes y una posición inicial long se abrirá.
Short -  - Adecuado para criptomonedas con movimientos descendentes y una posición short inicial se abrirá.'
              />
            </NavItem>
          </Nav>
          <Alert color='warning'>
            El parámetro recomendado basado en el análisis de datos históricos
            es sólo de referencia
          </Alert>
          <Row />

          <LavelRingLeft
            colRing={
              <div>
                <small>
                  Rango de precios <span>(USDT)</span>
                </small>
                <IconTooltipInfo
                  target='tooltip2'
                  text='Min. Precio a Max. Precio'
                />
              </div>
            }
            colLeft={
              <span id='rangodeprecios' className='elementoright'>
                0.7468 - 1.2706
              </span>
            }
          />

          <LavelRingLeft
            colRing={
              <div>
                <small>
                  Ganancia por Grid <span>(USDT)</span>
                </small>
                <IconTooltipInfo
                  target='rOIestimado'
                  text='ROI estimado por grid (tarifa de trading deducida). Sólo referencia'
                />
              </div>
            }
            colLeft={
              <span id='rangodeprecios' className='elementoright'>
                0.61% - 1.07% (63 Grids)
              </span>
            }
          />

          <LavelRingLeft
            colRing={
              <div>
                <small>Cuenta de Fondos</small>
              </div>
            }
            colLeft={
              <span id='rangodeprecios' className='elementoright'>
                0.0000 USDT
              </span>
            }
          />

          <LavelRingLeft
            colRing={
              <div>
                <small>
                  Minimo <span>20(USDT)</span>
                </small>
              </div>
            }
            colLeft={
              <div>
                <InputGroup>
                  <Input placeholder='Inversión' type='number' min={20} />
                  <InputGroupText>USDT</InputGroupText>
                </InputGroup>
              </div>
            }
            xsRing='5'
            xsLeft='7'
          />
        </Row>
      </Form>
    </>
  )
}

const Manual = () => {
  return <></>
}

export default Crear
