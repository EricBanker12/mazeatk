import React, { Component } from "react"
import { connect } from "react-redux"
import { debounce } from "lodash-core"

import Tab from "./tab"

import { DESKTOP, MOBILE, CHAT, SETUP, ABOUT, GAME } from "../utils/constants"

class Navbar extends Component {
    state = {show: false}

    resize = () => {
        if (this.props.game.device === DESKTOP && window.innerWidth < 768) {
            this.props.dispatch({
                type: "game",
                payload: {device: MOBILE}
            })
        }
        if (this.props.game.device === MOBILE && window.innerWidth >= 768) {
            if (this.props.game.tab === CHAT) {
                var tab = SETUP
            }
            this.props.dispatch({
                type: "game",
                payload: {device: DESKTOP, tab: tab || this.props.game.tab}
            })
        }
    }

    resizeHandler = debounce(this.resize, 50, {leading: true})
    
    componentDidMount() {
        if (typeof window !== typeof undefined) {
            this.resize()
            window.addEventListener("resize", this.resizeHandler)
        }
    }

    componentWillUnmount() {
        if (typeof window !== typeof undefined) {
            window.removeEventListener("resize", this.resizeHandler)
        }
    }

    render() {

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light col-12">
                <div className="navbar-brand"><h1>{this.props.game.tab}</h1></div>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded={this.state.show}
                    aria-label="Toggle navigation"
                    onClick={() => {this.setState({show: !this.state.show})}}>
                    <div className="navbar-toggler-icon" />
                </button>
    
                <div className={`collapse navbar-collapse${this.state.show ? " show" : ""}`}>
                    <ul className="navbar-nav mr-auto">
                        <Tab tab={SETUP} />
                        <Tab tab={GAME} />
                        <Tab tab={ABOUT} />
                        <Tab tab={CHAT} />
                    </ul>
                </div>
            </nav>
        )
    }
}

export default connect(({game}) => ({game}))(Navbar)