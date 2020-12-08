import React, { useReducer, useContext, useEffect } from "react"
import ReactDOM from 'react-dom'

const store = {
    user: null,
    books: null,
    movies: null
}

function reducer(state, action) {

}

const Context = React.createContext(null)

function App() {
    const [state, dispatch] = useReducer(reducer, store)
    const api = { state, dispatch }
    return (
        <Context.Provider value={api}>
            <User />
            <hr/>
            <Books />
            <Movies />
        </Context.Provider>
    )
}

function User() {
    const { state, dispatch } = useContext(Context)
    useEffect(() => {
        ajax('/user').then(user => {
            dispatch({ type: 'setUser', user: user })
        })
    }, [])
    return (
        <div>
            <h2>个人信息</h2>
            <div>name: { state.user ? state.user.name : '' }</div>
        </div>
    )
}
function Books() {
    const { state, dispatch } = useContext(Context)
    useEffect(() => {
        ajax('/books').then(books => {
            dispatch({ type: 'setBooks', books: books })
        })
    }, [])
    return (
        <div>
            <h2>我的书籍</h2>
            <ol>
                {state.books ? state.books.map(book => <li key={book.id}>{ book.name }</li>) : '加载中...'}
            </ol>
        </div>
    )
}

function Movies() {
    const { state, dispatch } = useContext(Context)
    useEffect(() => {
        ajax('/movies').then(movies => {
            dispatch({ type: 'setMovies', movies: movies})
        })
    }, [])
    return (
        <div>
            <h2>我的电影</h2>
            <ol>
                { state.movies ? state.movies.map(movie => <li key={movie.id}>{ movie.name }</li>) : '加载中。。。'}
            </ol>
        </div>
    )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

// 辅助函数
// 根据 path 的分发，返回一个对象
function ajax(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path === '/user') {
                resolve({
                    id: 1,
                    name: 'frank'
                })
            } else if (path === '/books') {
                resolve([
                    {
                        id: 1,
                        name: 'jsjsjjsjsjjsjssj'
                    },
                    {
                        id: 2,
                        name: 'lslslslsllsslslls'
                    }
                ])
            } else if (path === '/movies') {
                resolve([
                    {
                        id: 1,
                        name: '怦然心动'
                    },
                    {
                        id: 2,
                        name: '一无所有'
                    }
                ])
            }
        }, 2000)
    })
}
