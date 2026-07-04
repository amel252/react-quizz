import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const SECS_PER_QUESTION = 30;
const initialState = {
    questions: [],
    // le status de notre state au départ , les diff states "loading","error","ready","active", "finished"
    status: "loading",
    //  pour passer a la question suivante l'index passera de 0 à 1
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: 0,
};
function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        //  une fois le quiz est lancé le chrono démmare
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
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
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                //  pour que ca remet pas les réponses automatiquement sur le prochain
                answer: null,
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case "restart":
            // 2 manieres de remmettre les données à l'état initial
            // return {
            //     ...initialState,
            //     questions: state.questions,
            //     status: "ready",
            // };
            return {
                ...state,
                points: 0,
                highscore: 0,
                index: 0,
                answer: null,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                //  si le temps est écoulé l'état du quiz passe en finish
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
            };
        default:
            throw new Error("Action unknown");
    }
}
function App() {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    //  pour faire le calcul des points
    const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + cur.points,
        0,
    );

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);
    console.log({ status, index, points, maxPossiblePoints });
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
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                numQuestions={numQuestions}
                                index={index}
                            />
                        </Footer>
                    </>
                )}
                {/*  une fois le quiz est fini  */}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={highscore}
                        dispatch={dispatch}
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
