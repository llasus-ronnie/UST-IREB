import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

import img1 from '../../../../public/images/carousel/carousel-1.png';
import img2 from '../../../../public/images/carousel/carousel-2.png';
import img3 from '../../../../public/images/carousel/carousel-3.png';

import '../../styles/carousel/slider.css';

const images = [
    {
        src: img1,
        title: "About UST IREB",
        description: "The Institutional Research Ethics Board (IREB) was established to support high-impact research projects and increase research productivity at UST. It ensures adherence to ethical guidelines set by the Philippine Health Research Ethics Board (PHREB) and protects human participants in research."
    },
    {
        src: img2,
        title: "Mission",
        description: "The University of Santo Tomas, in pursuit of truth guided by reason and illumined by faith, dedicates herself to the generation, advancement, integration, dissemination, and application of knowledge to form competent and compassionate persons committed to serving the Church, the nation, and the global community."
    },
    {
        src: img3,
        title: "Vision",
        description: "By 2030, the University of Santo Tomas, faithful to her centuries-old tradition of excellence, envisions herself as a leading Catholic institution of learning in the Asia-Pacific, committed to the integral formation of her stakeholders for social transformation."
    }
];

function Slider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect} controls={false} className="carousel">
                {images.map((image, i) => (
                    <Carousel.Item key={i}>
                        <Image
                            className="d-block w-100"
                            src={image.src}
                            alt={`${image.title} slide`}
                        />
                        <Carousel.Caption className="carousel-text-align">
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <button className="carousel-control-prev" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </button>
            <button className="carousel-control-next" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
        </div>
    );
}

export default Slider;
