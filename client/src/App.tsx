import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AppThemeProvider } from "./theme";
import { router } from "./routing/routes";

function App() {
  return (
    <AppThemeProvider>
      <RouterProvider router={router} />
      {/* <VerificationCode /> */}
    </AppThemeProvider>
  );
}

export default App;
