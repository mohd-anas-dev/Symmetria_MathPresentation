import React from 'react'
import FooterImg from "./ChatGPT Image Nov 23, 2025, 03_12_23 PM.png"
import "../ComponentStyling/Footer.css"

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="FooterContainer">
                    <div className="LeftFooterContainerEnd">
                        <h1>© SYMMETRIA - GROUP 6. ALL RIGHTS RESERVED</h1>
                    </div>
                    <div className="MiddleFooterContainerEnd">
                        <h1>S<h2>YMMETRIA</h2></h1>
                    </div>
                    <div className="RightFooterContainerEnd">
                        <h1>SCROLL TO TOP <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 8L15 4M15 4L19 8M15 4L15 17C15 18.6569 13.6569 20 12 20H5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg></h1>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer
