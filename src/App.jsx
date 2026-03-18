import { Leva } from 'leva';
import './App.css'
import * as Canvas from './canvas';
import { OffCanvas } from './components';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeCanvas, setActiveCanvas] = useState('Globe');

  const CanvasComponent = Canvas[activeCanvas]

  return (
    <main>
      <OffCanvas handleClose={handleClose} show={show} handleShow={handleShow} setActiveCanvas={setActiveCanvas} />
      <Button variant="outline-primary" onClick={handleShow} className='rounded-pill position-fixed top-50 start-0 translate-middle-y z-3'>
        {'>'}
      </Button>
      <div>
        <div className='canvas_container bg-secondary'>
          <CanvasComponent />
        </div>
      </div>
        <Leva hidden={false} collapsed />
    </main>
  )
}

export default App
