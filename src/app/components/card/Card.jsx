import '../../styles/card/card.css'

import Image from 'next/image'

export default function Card(props) {
    return(
        <>
        <div className="card">
            <div className="card-content">

                <div className='image'>
                <Image src={props.image} alt={props.alt} />
                </div>

                <h1>{props.title}</h1>
                <p>{props.content}</p>
                <button> Click here </button>
            </div>
        </div>
        </>
    )
}