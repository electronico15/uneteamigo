import './botTrading.css'
import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
   Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  Card,
  CardImg,
  CardBody
} from 'reactstrap';
import Crear from './Crear'

const BotTrading = props => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <>
      <Card className='my-2'>
        <CardImg
          alt='Card image cap'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuw1Yzd7U9sertclwbQabADSu2bfkm5M_CCQ&usqp=CAU'
          style={{
            height: 180
          }}
          top
          width='100%'
        />

        <CardBody>
          <CardTitle tag='h3'>Grid Trading</CardTitle>
          <CardText>
          Captura oportunidades de ganancia 24/7 de manera automática.
          </CardText>
          <CardText>
            <small className='text-muted'>Tutoriales Grid</small>
          </CardText>
        </CardBody>
      </Card>

      <Container>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={{ active: activeTab === '1' }}
                  onClick={() => {
                    toggle('1')
                  }}
                >
                  Crear
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={{ active: activeTab === '2' }}
                  onClick={() => {
                    toggle('2')
                  }}
                >
                  Recomendado
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={{ active: activeTab === '3' }}
                  onClick={() => {
                    toggle('3')
                  }}
                >
                  Ejecutándose
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={{ active: activeTab === '4' }}
                  onClick={() => {
                    toggle('4')
                  }}
                >
                  Historial
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
               <Crear/>
              </TabPane>
              <TabPane tabId='2'>
                {/* Contenido para la pestaña "Ejecutándose" */}
              </TabPane>
              <TabPane tabId='3'>
                {/* Contenido para la pestaña "Historial" */}
              </TabPane>
              <TabPane tabId='4'>
                {/* Contenido para la pestaña "Historial" */}
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  )
}




export default BotTrading


