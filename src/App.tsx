import Header from "./containers/Header";
import AppContext from "./context/AppContext";
import useInitialState from "./hooks/useInitialState";
import MainCard from "./containers/MainCard";

function App() {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <Header />
      <MainCard />
    </AppContext.Provider>
  );
}

export default App;
