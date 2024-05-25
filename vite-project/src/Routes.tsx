import BackGround from "./components/bg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SamplePage from "./routes/Home";
import ListOfRoutes from "./routes/listofroutes";
import Login from "./routes/LogIn";
import SignUp from "./routes/SignUp";
import DashBoard from "./routes/DashBoard";
import ListOfStocks from "./routes/ListOfStocks";
import StockPage from "./routes/single_stock_page"; 
import Trade from "./routes/Trade";
import Watchlist from "./routes/watchlist";
import Account from "./routes/Account";
import Error from "./routes/Error";
import AddMoney from "./routes/AddMoney";
import WithdrawMoney from "./routes/WithdrawMoney";
import PageNotFound from "./routes/PageNotFound";
import Portfolio from "./routes/Portfolio";


interface routingInterface{
  isloggedin:boolean
}


function Routing({isloggedin}: routingInterface) {

  return (
    <Router>
        <BackGround />
        <Routes>
            <Route path="*" element={<PageNotFound/>}/>
            {/* DEV */}
            <Route path="/listofroutes" element={<ListOfRoutes />} />
            {/* PRE LOGIN */}

            <Route path="/"  element={isloggedin?<DashBoard/>:<SamplePage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* POST LOGIN */}
            {isloggedin ? (
                <>
                    <Route path="/trade" element={<Trade />}>
                        <Route path=":id" element={<Trade />} />
                    </Route>
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route
                        path="/stocklist"
                        element={<ListOfStocks />}
                    ></Route>
                    <Route
                        path="/single_stock_page"
                        element={<StockPage />}
                    >
                        <Route path=":id" element={<StockPage />} />
                    </Route>
                    <Route
                        path="/watchlist"
                        element={<Watchlist />}
                    ></Route>
                    <Route
                        path="/portfolio"
                        element={<Portfolio />}
                    ></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route path="/add-money" element={<AddMoney />} />
                    <Route
                        path="/withdraw-money"
                        element={<WithdrawMoney />}
                    />
                </>
            ) : (
                ""
            )}

            {/* NEUTRAL */}
            <Route path="/error" element={<Error />}>
                <Route path=":code" element={<Error />} />
            </Route>
        </Routes>
    </Router>
);
}

export default Routing