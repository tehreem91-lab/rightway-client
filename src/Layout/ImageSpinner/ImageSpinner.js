import React from 'react'
import './ImageSpinner.css'

const ImageSpinner = () => {
    return (
        <>
            <div class="spinner">
                <div class="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div>Loading...</div>
            </div>



        </>
    )
}

export default ImageSpinner