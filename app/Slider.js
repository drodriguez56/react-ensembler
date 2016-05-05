import React from 'react';
import { render } from 'react-dom';
import { Motion, spring } from 'react-motion'
import styles from './styles/Ensembler.css'

export default class Slider extends React.Component{
		constructor(props){
			super(props);	
			this.state = {
				slides: this.props.children,
				currentSlide: 0,
                windowWidth:0,
                mouse: 0,
                isPressed: false,
                lastPressed: 0,

			}
		}
    
    prevSlide = () => {
        this.setState({currentSlide: this.state.slides[this.state.currentSlide - 1] ? (this.state.currentSlide - 1): (this.state.slides.length - 1) })
    }
    nextSlide = () => {
        this.setState({currentSlide: this.state.slides[this.state.currentSlide + 1] ? (this.state.currentSlide + 1) : 0 })
    }
    getInitialState = () => {
        this.setState({windowWidth: window.innerWidth});
    }

    handleResize = () => {
        this.setState({windowWidth: window.innerWidth});
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        this.getInitialState();
    }

    handleTouchStart = (e) => {
        e.preventDefault()
        this.setState({
            isPressed: true,
            lastPressed: e.touches[0].pageX,
        })
    }

    handleMouseDown = (e) => {
        e.preventDefault()
        this.setState({
            isPressed: true,
            lastPressed: e.pageX,
        })
        
    }
    handleTouchMove = (e) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    }

    handleMouseMove = ({pageX}) => {
        if (this.state.isPressed){
            this.setState({
              mouse: pageX - this.state.lastPressed
            });
        }
    }
    handleMouseUp = () => {
        this.setState({
            isPressed: false,
            lastPressed: 0,
            mouse:0
        }); 
        if(this.state.mouse >= 100){
            this.prevSlide()
        }else if(this.state.mouse <= -100){
            this.nextSlide()
        }
    }

    handleTouchEnd = () => {
        this.setState({
            isPressed: false,
            lastPressed: 0,
            mouse:0
        }); 
        if(this.state.mouse >= 100){
            this.prevSlide()
        }else if(this.state.mouse <= -100){
            this.nextSlide()
        }
    }

        render() {
    	const {slides, currentSlide, windowWidth, mouse, isPressed} = this.state;
        return(
            <div className={styles.sliderSection}>
            	<div className={styles.slidesList} >
                    <Motion style={{ left: spring(windowWidth*this.state.currentSlide), x: mouse }}>
                        {({left, x}) =>
                            <div classMame={styles.sliderTrack} style={{width: (windowWidth*slides.length)}}>
                        		{ slides.map((e, i) => (
                    				<div className={styles.slide} style={{
                                        width: windowWidth, 
                                        left: ((windowWidth*i) - left) - x,
                                        transform: `translate3d(${2*x}px, 0 , 0)`
                                    }} 
                                    onTouchStart={(e) => this.handleTouchStart(e)}
                                    onTouchEnd={this.handleTouchEnd} 
                                    onMouseDown={(e) => this.handleMouseDown(e)}
                                    onMouseUp={this.handleMouseUp}
                                    >
                                        <div>{e}</div>
                		           	</div>
                        		  ))}
                            </div>
                        }
                        </Motion>
            	</div>
                <div className={styles.nexPrevButtons}>
                    <button onClick={this.prevSlide}>prev</button>
                    <button onClick={this.nextSlide}>next</button>
                </div>
            </div>
        )
    }
}
