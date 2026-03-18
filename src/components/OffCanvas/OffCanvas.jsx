import { Button, Offcanvas } from "react-bootstrap";

const OffCanvas = ({ active, show = false, handleClose = () => { }, setActiveCanvas = () => { } }) => {
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
                    ].map(x => (
                        <Button
                            key={x.key}
                            variant='dark'
                            onClick={() => setActiveCanvas(x.key)}
                            className={`w-100 text-start border-0 mb-1 rounded-0 canvas_button ${active === x.key ? 'active' : ''}`}
                        >{x.title}</Button>
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvas;