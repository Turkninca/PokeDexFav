import { useRef } from 'react'
import './Slider.css'
import { domStore } from '@/app/stores/mobxStore'
import { reaction } from 'mobx'

export default function Slider() {

    const ref = useRef(null)

    reaction(
        () => domStore.slider,
        (old, newDatum) => {
            try {
                ref.current.style.transform = domStore.slider ? 'translateX(40px)' : 'none'
            } catch {
                
            }
        }
    )

    function handleSlider() {
        domStore.setSlider(!domStore.slider)
    }

    return(
        <div className="slider-box"  onClick={() => handleSlider()}>
            <button ref={ref} className={`slider-circle`} />
        </div>
    )
}