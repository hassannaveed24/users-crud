// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./assets/scss/custom/app.scss";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes/routes";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Routes />
            </QueryClientProvider>
        </>
    );
}

export default App;
