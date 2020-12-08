import React, { Component, useState } from 'react'

function Example_2() {
    // 定义一个 State 变量，变量值可以通过 setCount 来改变
    const [count, setCount] = useState(0)
    /*const [count, setCount] = useState(() => {
        const initialState = someExpensiveComputation(props)
        return initialState
    })*/
    return (
        <div>
            <p>you clicked { count } times</p>
            <button onClick={() => setCount(count + 1)}>click handle</button>
        </div>
    )
}

class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        return (
            <div>
                <p>click { this.state.count } times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>click event</button>
            </div>
        )
    }
}

export default Example
