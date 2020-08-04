import React, { Component, createRef } from "react"
import { connect } from "react-redux"

import GameApplication from "./gameApplication"
import GameOver from "./gameOver"

class Game extends Component {
    state = {game: null}
    ref = createRef()

    init = () => {
        console.log("init")

        this.props.dispatch({
            type: "player",
            payload: {
                alive: true,
                score: 0,
                x: -360,
                dx: 2,
                y: 0,
                dy: 0,
            },
        })

        const game = new GameApplication()
        const deviceScale = 1/(devicePixelRatio || 1)
        game.app.view.style = `transform: scale3d(${deviceScale}, ${deviceScale}, 1); transform-origin: 0 0 0;`
        this.ref.current.appendChild(game.app.view)
        setTimeout(() => {game.resize()}, 0)
        this.setState({game})
    }

    reset = () => {
        this.state.game.destroy()
        this.init()
    }

    componentDidUpdate(props, state) {
        if (!this.props.hidden && props.hidden) {
            this.init()
        }
        if (this.props.hidden && !props.hidden && state.game) {
            state.game.destroy()
            this.setState({game: null})
        }
    }

    componentWillUnmount() {
        if (this.state.game) {
            this.state.game.destroy()
        }
    }
    
    render() {
        return (
            <div
                ref={this.ref}
                style={{
                    position: "relative",
                    backgroundColor: "#75CAEB",
                    width: "min(100%, 67vh)",
                    height: 0,
                    paddingBottom: "150%",
                    margin: "0 auto",
                    overflow: "hidden",
                }}>
                <GameOver reset={this.reset} />
            </div>
        )
    }
}

export default connect()(Game)