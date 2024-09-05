import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

import img1 from '../../../../public/images/carousel/carousel-img-1.png'
import img2 from '../../../../public/images/carousel/carousel-img-2.png'
import img3 from '../../../../public/images/carousel/carousel-img-3.png'

import '../../styles/carousel/slider.css'

function DarkVariantExample() {
return (
<>
<div className="carousel">
<Carousel data-bs-theme="light">

{/* about ireb */}
<Carousel.Item interval={5000}>
<Image
    className="d-block w-100"
    src={img3}
    alt="First slide"
/>
<Carousel.Caption className='carousel-text-align'>
    <h3>About UST IREB</h3>
    <p>
        The Institutional Research Ethics Board (IREB) was established to support high-impact research projects and increase research productivity at UST. It ensures adherence to ethical guidelines set by the Philippine Health Research Ethics Board (PHREB) and protects human participants in research.
        The UST-IREB oversees Research Ethics Committees (RECs) in each academic unit, which review research protocols involving human participants conducted by academic researchers, staff, students, and UST Hospital personnel. It also reviews protocols by external researchers requesting UST data or using university and hospital facilities.
    </p>
</Carousel.Caption>
</Carousel.Item>

{/* mission */}
<Carousel.Item interval={5000}>
<Image
    className="d-block w-100"
    src= {img1}
    alt="Second slide"
/>
<Carousel.Caption className='carousel-text-align'>
    <h3>Mission</h3>
    <p>The University of Santo Tomas, in pursuit of truth guided by reason and illumined by faith, dedicates herself to the generation, advancement, integration, dissemination, and application of knowledge to form competent and compassionate persons committed to serving the Church, the nation, and the global community.</p>
</Carousel.Caption>
</Carousel.Item>

{/* vision */}
<Carousel.Item interval={5000}>
<Image
    className="d-block w-100"
    src={img2}
    alt="Third slide"
/>
<Carousel.Caption className='carousel-text-align'>
    <h3>Vision</h3>
    <p>By 2030, the University of Santo Tomas, faithful to her centuries-old tradition of excellence, envisions herself as a leading Catholic institution of learning in the Asia-Pacific, committed to the integral formation of her stakeholders for social transformation.</p>
</Carousel.Caption>
</Carousel.Item>
</Carousel>
</div>

</>
);
}

export default DarkVariantExample;