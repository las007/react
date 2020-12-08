import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom'

const C = createContext(null)

function App() {
    const [n, setN] = useState(0)
    return (
        <C.Provider value={{ n, setN }}>
            <div className="App">
                <Parent />
            </div>
        </C.Provider>
    )
}

function Parent() {
    const { n } = useContext(C)
    return (
        <div>
            我是父亲 n：{ n } <Child />
        </div>
    )
}

function Child() {
    const { n, setN } = useContext(C)
    const onClick = () => {
        setN(i => i + 1)
    }
    return (
        <div>
            这是孩子，得到的 n：{ n }
            <button onClick={onClick}>+1</button>
        </div>
    )
}
