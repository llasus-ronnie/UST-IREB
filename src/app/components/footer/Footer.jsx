//sa wakas footer nalang 
import '../../styles/footer/footer.css';

//images
import ustLogo from '../../../../public/images/footer/ust-logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from 'next/image';

export default function Footer() {
return(
    <>
    <Container>
        <Row className='footer'>
            {/* column 1 */}
            <Col lg={6}>
            {/* logo/header */}
            <div className="ust-ireb-logo">
                <Image src={ustLogo} className="ust-logo" alt="ust-logo"/>
                <div className="ust-ireb-title">
                <h1>UST IREB</h1>
                <span> Research Portal </span>
                </div>
            </div>

            <p className='ust-ireb-subtitle'>
            © 2024. University of Santo Tomas - Institutional Research Ethics Board. All rights reserved.
            </p>
            </Col>

            {/* column 2 */}
            <Col md={4}>
                <p className='ust-ireb-address'>
                1/F Thomas Aquinas Research Center, University of Santo Tomas España Boulevard, Sampaloc, Manila 1008, Philippines
                </p>
            </Col>

            {/* column 3 */}
            <Col md={2}>
            <div className='ust-ireb-contacts'>
            <p>ireb@ust.edu.ph</p>
            <p>(02) 3406-1611 <br/> (02) 8553-1611 local 8919</p>
            </div>
            </Col>
        </Row>
    </Container>
    </>
)
}