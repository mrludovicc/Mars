import React from "react";
import Main from "./components/Main";
import { FormProvider } from "./components/Form/FormContext";

function App() {
  return (
    <FormProvider>
      <div className="App">
        <Main />
      </div>
    </FormProvider>
  );
}

export default App;
