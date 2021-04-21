import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import * as Sentry from "@sentry/react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

function App() {
  return (
    <Sentry.ErrorBoundary fallback={"An error has occurred"}>
      <main className="container-fluid">
        <NavBar />
        <ToastContainer />
        <div className="container-lg">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    </Sentry.ErrorBoundary>
  );
}

export default App;
