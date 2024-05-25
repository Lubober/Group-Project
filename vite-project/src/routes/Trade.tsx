import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { options } from "../routes/single_stock_page";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/entryfield.css";
import "../styles/trade.css";
// import TradeDropdown from "../components/tradedropdown";
// import BackGround from "../components/bg";
// import { color } from "chart.js/helpers";

import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const userMoney = "£2300";
const userStockHoldings = "234.34";
const StockGain = true; // apply logic for finding out whether stock change was pos or negative
// placeholder data to be plugged in to backend
const currentPrice = "£230.21";
const priceChange = "130%";
// COMMENTED TO STOP TYPESCRIPT FROM DISPLAYING ERRORS, FEEL FREE TO UN-COMMENT
// const marketCap = "£643bn";
// const volume24h = "£23.3bn";
// const allTimeHigh = "£310.21";
// const priceChange7d = "£14.21";
// const someData1 = "£441";
// const aboutText =
("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum");
const companyName = "Microsoft Corp";
const companySymbol = "MSFT";


function Trade() {
    const [actualprice, setActualPrice] = useState(0);
    const [isAutomated, setAutomatedTrades] = useState(false);
    const [sliderPriceValue, setSliderPriceValue] = useState(0); //set a default
    const [sliderQuantityValue, setSliderQuantityValue] = useState(0); //set a default

    // const handleChange = (evt) => {
    //   setSliderPriceValue(evt.target.value);
    // };

    const handlePriceChange = (evt) => {
        setSliderPriceValue(evt.target.value);
    };

    const handleQuantityChange = (evt) => {
        setSliderQuantityValue(evt.target.value);
        // console.log(evt.target.value)
        const theprice = evt.target.value * stockinfo.current_price;
        setActualPrice(Math.round(theprice));
    };

    const handleToggleChange = () => {
        setAutomatedTrades((checked) => !checked);
        console.log(isAutomated);
    };

    // const handleBuyOrder = () => {
    //   sliderPriceValue
    //   sliderQuantityValue
    // }

    const [stockinfo, setStockInfo] = useState({});
    // {
    //     ticker: "noticker",
    //     current_price: 10131,
    //     current_volume: 100000000,
    //     amount_of_stocks_owned: 7890,
    // },
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        console.log(isAutomated);
        console.log(id);
        console.log(typeof id);
    }, []);

    async function fetchStock(ticker: string) {
        try {
            const urlparam = new URLSearchParams({
                ticker: ticker,
            });
            let responce = await fetch(
                "http://localhost:8808/api/singleStockPage/?" + urlparam,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "session-token"
                        )}`,
                    },
                    // body:currentTicker
                }
            ).then((responce) => {
                console.log(responce)
                return responce.json();
            });
            // .then((data)=>{
            //   console.log(data)
            //   setStockInfo(data)
            //   console.log(stockinfo)
            //   setFinished(true)
            // })
            // console.log(responce);
            console.log(responce)
            return responce;
        } catch (e) {
            console.log(e);
        }
    }
    let id = useParams().id;
    if (!finished) {
        if (stockinfo) {
            fetchStock(id).then((res) => {
                setStockInfo(res);
            });
            console.log(stockinfo);
            setFinished(true);
        }
    }

    const handleBuyOrder = (e: FormEvent) => {
        e.preventDefault();
        isAutomated ? handleAutomaticBuyOrder() : handleNonAutomaticBuyOrder();
    };

    async function handleAutomaticBuyOrder() {
        const uri = "http://localhost:8808/api/limitOrder/";

        if (actualprice > 0) {
            const jsondata = JSON.stringify({
                ticker: stockinfo.ticker,
                trade_type: "buy",
                amount: sliderQuantityValue,
                price: sliderPriceValue,
            });
            console.log(jsondata);
            try {
                fetch(uri, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "session-token"
                        )}`,
                    },
                    body: jsondata,
                }).then((res) => {
                    console.log(res);
                });
            } catch (e) {
                console.log(e);
            }
        }

        // localStorage.setItem("login-credentials", jsondata);
        // upload(jsondata, uri); //send data to back-end later
    }

    async function handleNonAutomaticBuyOrder() {
        const uri = "http://localhost:8808/api/marketOrder/";

        if (actualprice > 0) {
            const jsondata = JSON.stringify({
                ticker: stockinfo.ticker,
                trade_type: "buy",
                amount: sliderQuantityValue,
            });
            console.log(jsondata);
            try {
                fetch(uri, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "session-token"
                        )}`,
                    },
                    body: jsondata,
                }).then((res) => {
                    console.log(res);
                });
            } catch (e) {
                console.log(e);
            }
        }

        
    }

    const handleSellOrder = (e: FormEvent) => {
        e.preventDefault();
        isAutomated ? handleAutomaticSellOrder() : handleNonAutomaticSellOrder();
    };

    async function handleAutomaticSellOrder() {
        const uri = "http://localhost:8808/api/limitOrder/";

        if (actualprice > 0) {
            const jsondata = JSON.stringify({
                ticker: stockinfo.ticker,
                trade_type: "sell",
                amount: sliderQuantityValue,
                price: sliderPriceValue,
            });
            console.log(jsondata);
            try {
                fetch(uri, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "session-token"
                        )}`,
                    },
                    body: jsondata,
                }).then((res) => {
                    console.log(res);
                });
            } catch (e) {
                console.log(e);
            }
        }

        // localStorage.setItem("login-credentials", jsondata);
        // upload(jsondata, uri); //send data to back-end later
    }

    async function handleNonAutomaticSellOrder() {
        const uri = "http://localhost:8808/api/marketOrder/";

        if (actualprice > 0) {
            const jsondata = JSON.stringify({
                ticker: stockinfo.ticker,
                trade_type: "sell",
                amount: sliderQuantityValue,
            });
            console.log(jsondata);
            try {
                fetch(uri, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "session-token"
                        )}`,
                    },
                    body: jsondata,
                }).then((res) => {
                    console.log(res);
                });
            } catch (e) {
                console.log(e);
            }
        }

    // async function handleSellOrder(e: FormEvent) {
    //     const uri = "http://localhost:8808/api/marketOrder/";
    //     e.preventDefault();
    //     if (actualprice > 0) {
    //         const jsondata = JSON.stringify({
    //             ticker: stockinfo.ticker,
    //             tradeType: "sell",
    //             amount: sliderQuantityValue,
    //         });
    //         console.log(jsondata);
    //         try {
    //             fetch(uri, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${localStorage.getItem(
    //                         "session-token"
    //                     )}`,
    //                 },
    //                 body: jsondata,
    //             }).then((res) => {
    //                 console.log(res);
    //             });
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }

        // localStorage.setItem("login-credentials", jsondata);
        // upload(jsondata, uri); //send data to back-end later
    }

    return (
        <>
            <NavBar rightsignup={false} />

            <span className="elements">
                <div className="graph">
                    {" "}
                    <h1 className="company-title display-4 mb-4 text-white">
                        {stockinfo.stock_name} {stockinfo.ticker}
                    </h1>
                    <div className="priceandchange">
                        <h2 className="currentPrice">&pound;{stockinfo.current_price}</h2>
                        {stockinfo.current_change==0? <h2
                                className="change"
                                style={{ color: "rgb(0, 0, 0)" }}
                            >
                                {stockinfo.current_change}%
                            </h2>
                             :stockinfo.current_change>0 ? (
                            <h2
                                className="change"
                                style={{ color: "rgb(0, 200, 0)" }}
                            >
                                ▲ {stockinfo.current_change}%
                            </h2>
                        ) : (
                            <h2 className="change" style={{ color: "red" }}>
                                ▼ {stockinfo.current_change}%
                            </h2>
                        )}
                    </div>
                    {/* <div
                        className="chart-container mb-4"
                        style={{
                            background: "none",
                            borderRadius: "8px",
                            padding: "20px",
                            height: "500px",
                        }}
                    >
                        <Line data={stockData} options={options} />
                    </div> */}
                </div>

                <div className="trade-functionality-area">
                    <label
                        htmlFor="trade-functionality-area"
                        className="company-title display-6 mb-3 text-white"
                        style={{ textAlign: "center" }}
                    >
                        Trade
                    </label>

                    <div className="trade-stuff">
                        <div className="toggle-btn">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isAutomated}
                                        onChange={handleToggleChange}
                                        color="primary"
                                    />
                                }
                                label={
                                    isAutomated
                                        ? "Automated Trades"
                                        : "Real-Time Trades"
                                }
                            />
                        </div>

                        {isAutomated ? (
                            <div
                                className="trade-price-elements"
                                style={{ width: 300 }}
                            >
                                <label
                                    htmlFor="limit-price-id"
                                    className="lead text-white"
                                >
                                    Price*
                                </label>
                                <input
                                    className="text-price"
                                    type="text"
                                    id="limit-price-id"
                                    required={isAutomated ? true : false}
                                    name="limit_price"
                                    value={sliderPriceValue}
                                    onChange={handlePriceChange}
                                />

                                <Slider
                                    value={sliderPriceValue} // change later
                                    onChange={handlePriceChange}
                                    aria-label="Slider"
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    min={0}
                                    max={100} //change later
                                />
                            </div>
                        ) : (
                            <p
                                className="lead text-white market-text"
                                style={{ padding: 19 }}
                            >
                                Order will execute at Market Price
                            </p>
                        )}

                        <div
                            className="trade-quantity-elements"
                            style={{ width: 300 }}
                        >
                            <label
                                htmlFor="stock-quantity-id"
                                className="lead text-white"
                            >
                                Quantity*
                            </label>
                            <input
                                className="text-quantity"
                                type="text"
                                id="stock-quantity-id"
                                required={true}
                                name="quantity"
                                value={sliderQuantityValue}
                                onChange={handleQuantityChange}
                            />

                            <Slider
                                value={sliderQuantityValue} // change later
                                onChange={handleQuantityChange}
                                aria-label="Slider"
                                valueLabelDisplay="auto"
                                step={0.01}
                                min={0}
                                max={100} //change later
                            />
                        </div>
                    </div>

                    <div className="trade-btns">
                        <button
                            className="btn-dark-purple"
                            onClick={handleBuyOrder}
                        >
                            Buy
                        </button>
                        {isAutomated ? (
                            <p className="atprice">{Math.round(actualprice*sliderPriceValue)} &pound;</p>
                        ) : (
                            <p className="atprice">{actualprice} &pound;</p>
                        )}

                        <button
                            className="btn-dark-purple"
                            onClick={handleSellOrder}
                        >
                            Sell
                        </button>
                    </div>
                </div>
                <div className="user-holdings">
                    {/* <p className="lead text-white user-money">
                        Account Balance: {userMoney}
                    </p> */}
                    <p className="lead text-white user-holdings">
                        Account Stock Holdings: {stockinfo.amount_of_stocks_owned}
                    </p>
                </div>
            </span>

            <Footer />
        </>
    );
}

export default Trade;
