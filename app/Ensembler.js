import React from 'react';
import { render } from 'react-dom';
import { fetchSlides } from './lib/db.js';
import { Motion, spring } from 'react-motion'
import styles from './styles/Ensembler.css'
import Slider from './Slider'

export default class Ensembler extends React.Component{
        constructor(props){
            super(props);
            this.state = { sections: [1], slidesToDisplay: ["https:\/\/d7677ee7d66f831d2515-1c0040cb7de827f1f7b4fcca9328ef62.ssl.cf1.rackcdn.com\/spree\/products\/280\/large\/CP_Sneakers_White_%281%29.png?1454626518","https:\/\/d7677ee7d66f831d2515-1c0040cb7de827f1f7b4fcca9328ef62.ssl.cf1.rackcdn.com\/spree\/products\/20\/large\/PS_Taped_Back_TShirt_Gray.png?1445377228","https:\/\/d7677ee7d66f831d2515-1c0040cb7de827f1f7b4fcca9328ef62.ssl.cf1.rackcdn.com\/spree\/products\/31\/large\/PS_Slim_Fit_Selvedge_Jean.png?1445377167","https:\/\/d7677ee7d66f831d2515-1c0040cb7de827f1f7b4fcca9328ef62.ssl.cf1.rackcdn.com\/spree\/products\/37\/large\/RG_Coat_Black.png?1445376138","https:\/\/d7677ee7d66f831d2515-1c0040cb7de827f1f7b4fcca9328ef62.ssl.cf1.rackcdn.com\/spree\/products\/34\/large\/PS_Hoodie.png?1445377277"], loading: true}
        }
        componentDidMount = () =>{
            fetchSlides
        }
		render(){
            const {slidesToDisplay, sections} = this.state
            return(
                
                <div>
                    {sections.map((e,i)=>(
                    <Slider>
                        { slidesToDisplay.map((e, i) => (
                            <div><img className={styles.productImg} src={e}/></div>
                        ))}

                    </Slider>
                    ))}
                </div>
                )
        }
}
