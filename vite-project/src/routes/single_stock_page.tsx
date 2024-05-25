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
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/bootstrap_override.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import AddToWatchlistButton from "../components/addtowatchlist";

// Register the components
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// placeholder data to be plugged in to backend
const currentPrice = "£230.21";
const priceChange = "130%";
const marketCap = "£643bn";
const volume24h = "£23.3bn";
const allTimeHigh = "£310.21";
const priceChange7d = "£14.21";
const someData1 = "£441";
const aboutText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
const companyName = "Microsoft Corp";
const companySymbol = "MSFT";

// Graph options

export const options = {
    scales: {
        y: {
            beginAtZero: false,
            grid: {
                color: "rgba(255, 255, 255, 0.1)",
                borderWidth: 1,
            },
            ticks: {
                color: "#ffffff",
                font: {
                    size: 14,
                },
            },
        },
        x: {
            grid: {
                color: "rgba(255, 255, 255, 0.1)",
                borderWidth: 1,
            },
            ticks: {
                color: "#ffffff",
                font: {
                    size: 14,
                },
            },
            title: {
                display: false,
            },
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
};

function StockPage() {
    const [stockData, setStockData] = useState({
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "MSFT Stock Price",
                data: [
                    200, 220, 214, 227, 212, 244, 248, 235, 257, 278, 265, 295,
                ], // Example data
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                tension: 0.1,
            },
        ],
    });

    const [stockinfo, setStockInfo] = useState();
    // {
    //     ticker: "noticker",
    //     current_price: 10131,
    //     current_volume: 100000000,
    //     amount_of_stocks_owned: 7890,
    // },
    const [finished, setFinished] = useState(false);

    async function fetchHistory() {
        if (stockinfo)
            try {
                const urlparam = new URLSearchParams({
                    ticker: stockinfo.ticker,
                    MaxDataPoints:500,
                    noDaysHistory:30
                });
                // const jsondata = JSON.stringify({ ticker: stockinfo.ticker });
                console.log("TICKERRRRRR");
                console.log(stockinfo.ticker);
                fetch("http://localhost:8808/api/getGraphPoints/?" + urlparam, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "session-token"
                        )}`,
                    },
                })
                    .then((res) => {
                        console.log(res);
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        let prices = []
                        let dates = []
                        for(let i = 0;i<data.data.length;i++){
                            prices.push(data.data[i].value)
                            dates.push(data.data[i].date)
                        }
                        console.log(prices)
                        console.log(dates)
                        setStockData({
                            labels: dates,
                            datasets: [
                                {
                                    label: "MSFT Stock Price",
                                    data: prices, // Example data
                                    borderColor: "rgb(53, 162, 235)",
                                    backgroundColor: "rgba(0, 0, 0, 0)",
                                    tension: 0.1,
                                },
                            ],
                        });
                    });
            } catch (e) {
                console.log(e);
            }
        else {
            window.setTimeout(fetchHistory, 100);
        }
    }

    useEffect(() => {
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
                return responce.json();
            });
            // .then((data)=>{
            //   console.log(data)
            //   setStockInfo(data)
            //   console.log(stockinfo)
            //   setFinished(true)
            // })
            // console.log(responce);
            return responce;
        } catch (e) {
            console.log(e);
        }
    }
    let id = useParams().id;

    if (!finished) {
        fetchStock(id)
            .then((res) => {
                setStockInfo(res);
                console.log("STOCKINFO");
                console.log(stockinfo);
            })
            .then(() => {
                // fetchHistory("http://localhost:8808/api/getLongestGraph/?")
                // fetchHistory("http://localhost:8808/api/getMonthGraph/?")
                // fetchHistory("http://localhost:8808/api/getDayGraph/?")
                fetchHistory();
            });
        if (stockinfo) {
            console.log(stockinfo);
            setFinished(true);
        }
    }

    const tradelink = `../trade/${id}`;
    return (
        <>
            {finished ? (
                <>
                    {" "}
                    <NavBar rightsignup={false} />
                    <main className="container my-5">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <h1 className="company-title display-4 mb-4 text-white">
                                    {stockinfo.stock_name} {stockinfo.ticker}
                                </h1>
                                <p className="lead mb-4 text-white">
                                    The current price is{" "}
                                    <strong>
                                        {stockinfo.current_price}&pound;
                                    </strong>{" "}
                                    which is 
                                    {stockinfo.current_change>0?" up ":" down "}
                                     by{" "}
                                    <strong>{Math.abs(stockinfo.current_change)}%</strong> from the last
                                    closing price.
                                </p>
                                <div
                                    className="chart-container mb-4"
                                    style={{
                                        background: "none",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        height: "500px",
                                    }}
                                >
                                    <Line data={stockData} options={options} />
                                </div>
                                {/* Market stats section */}
                                <div
                                    className="market-stats-container mb-5"
                                    style={{
                                        background: "",
                                        color: "white",
                                        padding: "20px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <div className="row">
                                        <div className="col market-stat">
                                            <p>Price</p>
                                            <p>{stockinfo.current_price}</p>
                                        </div>
                                        <div className="col market-stat">
                                            <p>Change</p>
                                            <p>{stockinfo.current_change}%</p>
                                        </div> 
                                        <div className="col market-stat">
                                            <p>Volume (24h)</p>
                                            <p>{stockinfo.current_volume}</p>
                                        </div>
                                        {/* <div className="col market-stat">
                                            <p>Price change 7d</p>
                                            <p>{priceChange7d}</p>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="about-company lead text-white mb-4">
                                    <h3 className="mb-4">
                                        About {companyName}
                                    </h3>
                                    <p>{aboutText}</p>
                                </div> */}
                                <div
                                    className="trade-button-container text-center mb-5"
                                    style={{
                                        display: "flex",
                                        gap: "30px",
                                        justifyContent: "center",
                                    }}
                                >
                                    <a
                                        href={tradelink}
                                        className="btn btn-primary btn-lg"
                                    >
                                        Trade
                                    </a>
                                    <AddToWatchlistButton ticker={id} />
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </>
            ) : (
                <>
                    <Loading />
                </>
            )}
        </>
    );
}

export default StockPage;
