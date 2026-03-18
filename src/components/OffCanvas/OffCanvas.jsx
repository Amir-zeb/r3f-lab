import { Button, Offcanvas } from "react-bootstrap";

const OffCanvas = ({ show = false, handleClose = () => { }, setActiveCanvas = () => { } }) => {
    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shapes</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {[
                        {
                            title: 'Dancing Cones',
                            key: 'DancingCones'
                        },
                        {
                            title: 'Globe',
                            key: 'Globe'
                        }
                    ].map(x => (<Button key={x.key} onClick={() => setActiveCanvas(x.key)} className="w-100 mb-2 text-start">{x.title}</Button>))
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvas;