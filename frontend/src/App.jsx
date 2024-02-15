import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./helpers/PrivateRoute";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/discover",
    element: <PrivateRoute><Discover /></PrivateRoute>,
  },
  {
    path:'/:city',
    element: <Dashboard/>
  }
]);

const queryClient = new QueryClient();

export const AppContext = createContext();
function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState(null);
 
  return (
    <>
      <AppContext.Provider
        value={{
          token,
          setToken,
          userName,
          setUserName,
          location,
          setLocation,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
