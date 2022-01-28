// You will need to import components here
import { StoreProvider } from "./utils/globalState";
function App() {
  return (
    <StoreProvider>
      <div> Hello World</div>
      </StoreProvider>
  );
}

export default App;
