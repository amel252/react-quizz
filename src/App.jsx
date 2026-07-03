import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./Layout/Header";
import Main from "./Layout/Main";

const initialState = {
    questions: [],
    // le status de notre state au départ , les diff states "loading","error","ready","active", "finished"
    status: "loading",
};
function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        default:
            throw new Error("Action unknown");
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);
    return (
        <div className="app">
            <Header />
            <Main>
                <p>1/15</p>
                <p>Question ?</p>
            </Main>
        </div>
    );
}

export default App;
// Explications 1-nous avons installé jsonServer packague pour créer une fake API questions,
// 2- config dans package.json le "server" avec le chemin pour lire la data et le port
// 3 - useEffect avec fetch pour recup nos données et pour mettre a jour le state nous avons utilisé useReducer hook , créer notre initialState au démmarage tableau vide
