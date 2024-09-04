import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

import img1 from '../../../../public/images/carousel/carousel-img-1.png'
import img2 from '../../../../public/images/carousel/carousel-img-2.png'
import img3 from '../../../../public/images/carousel/carousel-img-3.png'

import '../../styles/carousel/slider.css'

function DarkVariantExample() {
return (
<>
<Carousel data-bs-theme="light">

{/* about ireb */}
<Carousel.Item interval={5000}>
<Image
    className="d-block w-100"
    src={img3}
    alt="First slide"
/>
<Carousel.Caption className='carousel-text-align'>
    <h5>About UST IREB</h5>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
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
    <h5>Mission</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in </p>
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
    <h5>Vision</h5>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in     </p>
</Carousel.Caption>
</Carousel.Item>
</Carousel>

</>
);
}

export default DarkVariantExample;