import DateCounter from "./components/DateCounter";
import Header from "./Layout/Header";
import Main from "./Layout/Main";

function App() {
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
