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
                <Image src={ustLogo} alt="ust-logo"/>
                <h1>UST IREB</h1>
                <h1> Research Portal </h1>
            </div>

            <p className='col-1-p'>
            © 2024. University of Santo Tomas - Institutional Research Ethics Board. All rights reserved.
            </p>
            </Col>

            {/* column 2 */}
            <Col 
            md={4}
            style={{ paddingLeft: '4rem', paddingRight:'3rem' }}>

                <p className='ust-ireb-address'>
                Administration Office, Ground Floor, Thomas Aquinas Research Complex University of Santo Tomas España Boulevard, Sampaloc, Manila 1008, Philippines
                </p>
            </Col>

            {/* column 3 */}
            <Col md={2} className='ust-ireb-contacts'>
            <p>ustirebemailhere@domain.com</p>
            <p>+63-2-8731-5396 <br/>+63-2-3406-1611 local 8247</p>
            </Col>
        </Row>
    </Container>
    </>
)
}