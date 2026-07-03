import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
    questions: [],
    // le status de notre state au départ , les diff states "loading","error","ready","active", "finished"
    status: "loading",
    //  pour passer a la question suivante l'index passera de 0 à 1
    index: 0,
    answer: null,
    points: 0,
};
function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "start":
            return {
                ...state,
                status: "active",
            };
        case "newAnswer":
            const question = state.questions.at(state.index);
            //  les points ne sont pas identique sont on additionne
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
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
    const [{ questions, status, index, answer }, dispatch] = useReducer(
        reducer,
        initialState,
    );

    const numQuestions = questions.length;
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
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <Question
                        question={questions[index]}
                        dispatch={dispatch}
                        answer={answer}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
// Explications 1-nous avons installé jsonServer packague pour créer une fake API questions,
// 2- config dans package.json le "server" avec le chemin pour lire la data et le port
// 3 - useEffect avec fetch pour recup nos données et pour mettre a jour le state nous avons utilisé useReducer hook , créer notre initialState au démmarage tableau vide
