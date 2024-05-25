import { useEffect, useState } from "react";
import StockEntryGuide from "./stockguide";
import StockInfo from "./stockinfo";
import Loading from "./loading";
import { redirect, useNavigate } from "react-router-dom";

interface StockListConfig {
    thetitle: string;
    thetype: string;
    thewidth: string;
    thequantity: number;
    thedisplaypreset: number;
    thegap: number;
    // 0=full, 1=hide market cap 2= hide mc and volume
}

function StockInfoList({
    thegap,
    thedisplaypreset,
    thetype,
    thewidth,
    thequantity,
    thetitle,
}: StockListConfig) {
    const [listofallentries, setEntries] = useState([
        // {
        //     // id: -1,
        //     // name: "stock1",
        //     // price: "32,309.32",
        //     // change: "120",
        //     // cap: "643",
        //     // volume: "23.1",
        // },
    ]);
    const [thiscurrententry, setThisCurrentEntry] = useState();
    const [alltickers, setTickers] = useState([]);

    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(true);

    async function refreshButton() {
        console.log(alltickers);
        console.log(listofallentries.length);
        const thestartinglistofstocks = listofallentries;
        let thecurrentquantity;
        if (listofallentries.length + 10 < alltickers.length) {
            thecurrentquantity = listofallentries.length + 10;
        } else {
            thecurrentquantity = alltickers.length;
        }
        let temporarylistofentries = await setTheEntriesHelper(
            listofallentries.length,
            thecurrentquantity,
            alltickers
        );
        // thestartinglistofstocks.push(temporarylistofentries)
        // listofallentries.push(temporarylistofentries)
        console.log(temporarylistofentries);
        console.log(typeof thestartinglistofstocks);

        console.log();
        setEntries(thestartinglistofstocks.concat(temporarylistofentries));
        // for(let i in temporarylistofentries){
        //     console.log(temporarylistofentries[i])
        //     thestartinglistofstocks.push(temporarylistofentries[i])
        // }
        // temporarylistofentries = thestartinglistofstocks.concat(temporarylistofentries)
    }
    async function setTheEntriesHelper(
        start: number,
        thequantityargument: number,
        tickers: string[]
    ) {
        const temporarylistofentries: object[] = [];

        for (let i = start; i < thequantityargument; i++) {
            // const thisentry = fetchStock()

            if(tickers[i]){
                await fetchStock(tickers[i]).then((value) => {
                    // console.log(value);
                    const temporaryentry = {
                        id: value.ticker,
                        name: value.stock_name,
                        price: value.current_price,
                        change: value.current_change,
                        cap: value.current_volume,
                        volume: value.amount_of_stocks_owned,
                    };
                    // if(temporaryentry.includes()){}
                    temporarylistofentries.push(temporaryentry);
                });
            }
        }
        return temporarylistofentries;
    }
    const authstring = `Bearer ${localStorage.getItem("session-token")}`;
    async function fetchStock(ticker: string) {
        const currentTicker = ticker;
        let responce = null;
        try {
            const urlparam = new URLSearchParams({
                ticker: currentTicker,
            });
            const rawResponce = await fetch(
                "http://localhost:8808/api/singleStockPage/?" + urlparam,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authstring,
                    },
                    // body:currentTicker
                }
            );
            responce = await rawResponce.json();
            console.log("responce for single stock");
            console.log(responce);
            return responce;
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchFTSE() {
        fetch("http://localhost:8808/api/FTSE/", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: authstring,
            },
        })
            .then((response) => {
                console.log("responce");
                console.log(response);
                // console.log(response.status)
                if (response.status == 401) {
                    localStorage.removeItem("session-token");
                    navigate("/");
                    window.location.reload();
                } else if (response.status == 200) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.tickers);
                setTickers(data.tickers);
                // localStorage.setItem("tickers", data.tickers);
                return data.tickers;
            })
            .then((tickers) => {
                if (tickers != null) {
                    let thecurrentquantity;
                    if (thequantity == -1) {
                        if (tickers.length > 10) {
                            thecurrentquantity = 10;
                        } else {
                            thecurrentquantity = tickers.length;
                        }
                    } else {
                        thecurrentquantity = thequantity;
                    }
                    const temporarylistofentries = setTheEntriesHelper(
                        0,
                        thecurrentquantity,
                        tickers
                    );
                    return temporarylistofentries;
                } else {
                    console.log("null");
                }
            })
            .then((x) => {
                setEntries(x);
                setIsPending(false);
                // console.log(listofallentries)
            });
    }
    async function fetchWatchlist() {
        fetch("http://localhost:8808/api/watchlist/", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: authstring,
            },
        })
            .then((response) => {
                console.log("Watchlist res");
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log("watchlist DATA");
                console.log(data.stock_tickers);
                return data.stock_tickers;
            })
            .then((tickers) => {
                if (tickers != null) {
                    let thecurrentquantity;
                    if (thequantity == -1) {
                        if (tickers.length > 10) {
                            thecurrentquantity = 10;
                        } else {
                            thecurrentquantity = tickers.length;
                        }
                    } else {
                        thecurrentquantity = thequantity;
                    }
                    const temporarylistofentries = setTheEntriesHelper(
                        0,
                        thecurrentquantity,
                        tickers
                    );
                    return temporarylistofentries;
                } else {
                    console.log("null");
                }
            })
            .then((x) => {
                setEntries(x);
                setIsPending(false);
                // console.log(listofallentries)
            });

        // .then((tickers) => {
        //     if (tickers != null) {
        //         let thecurrentquantity
        //         if(thequantity==-1){
        //             if(tickers.length>10){
        //                 thecurrentquantity = 10
        //             }
        //             else{
        //                 thecurrentquantity=tickers.length
        //             }

        //         }
        //         else{
        //             thecurrentquantity=thequantity
        //         }
        //         const temporarylistofentries =  setTheEntriesHelper(0,thecurrentquantity,tickers)
        //         return temporarylistofentries
        //     }
        //     else{
        //         console.log('null')
        //     }

        // })
        // .then((x) => {
        //     setEntries(x)
        //     setIsPending(false);
        //     // console.log(listofallentries)
        // });
    }
    async function fetchPortfolio() {
        fetch("http://localhost:8808/api/portfolioRequest/", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: authstring,
            },
        }) 
            .then((response) => {
                console.log("FTSERESPONCE");
                console.log(response);
                // console.log(response.status)
                if (response.status == 401) {
                    localStorage.removeItem("session-token");
                    navigate("/");
                    window.location.reload();
                } else if (response.status == 200) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log("DATA");
                console.log(data.tickers);
                return data.tickers
            })
            .then((tickers) => {
                if (tickers != null) {
                    let thecurrentquantity;
                    if (thequantity == -1) {
                        if (tickers.length > 10) {
                            thecurrentquantity = 10;
                        } else {
                            thecurrentquantity = tickers.length;
                        }
                    } else {
                        thecurrentquantity = thequantity;
                    }
                    const temporarylistofentries = setTheEntriesHelper(
                        0,
                        thecurrentquantity,
                        tickers
                    );
                    return temporarylistofentries;
                } else {
                    console.log("null");
                }
            })
            .then((x) => {
                setEntries(x);
                setIsPending(false);
                // console.log(listofallentries)
            });
    }

    useEffect(() => {  
        //
        //
        //
        // console.log(localStorage.getItem('session-token'))
        // const authstring = `Bearer ${localStorage.getItem("session-token")}`;
        //
        //
        //
        //
        let theurl = "http://localhost:8808/api/FTSE/";
        // if(thetype=="stocklist"){
        //     theurl="http://localhost:8808/api/FTSE/"
        // }
        // else if(thetype=="watchlist"){
        //     theurl = "http://localhost:8808/api/watchlist/"
        // }
        // else if(thetype == "portfolio"){
        //     theurl = "http://localhost:8808/api/portfolioRequest/"
        // }
        try {
            if (thetype == "stocklist") {
                fetchFTSE();
            } else if (thetype == "watchlist") {
                fetchWatchlist();
            } else if (thetype == "portfolio") {
                fetchPortfolio();
            }
        } catch (error) {
            console.log(error);
        }
        console.log("LISTOFALLETRIES")
        console.log(listofallentries)
    }
    , []);

    thequantity >= 0 ? listofallentries.slice(0, thequantity) : "";
    // console.log(thetype)

    return (
        <div className="stockentriescomponent" style={{ width: thewidth }}>
            <h1>{thetitle}</h1>
            <div className="sort"></div>
            <div className="stockentries">
                <StockEntryGuide preset={thedisplaypreset} />
                {/* {isPending && <Loading />} */}

                {listofallentries.length==0? (
                    (thetype == "watchlist" || thetype == "portfolio") &&
                    !isPending ? (
                        <h2>Nothing Here Yet</h2>
                    ) : (
                        <Loading />
                    )
                ) :
                 (
                    <div
                        className="stockentryinfos"
                        style={{ gap: `${thegap}px` }}
                    >
                        {thequantity >= 0
                            ? listofallentries
                                  .slice(0, thequantity)
                                  .map((stock) => (
                                      <StockInfo
                                          key={stock.id}
                                          id={stock.id} 
                                          name={stock.name} 
                                          price={stock.price}
                                          change={stock.change}
                                          cap={stock.cap}
                                          volume={stock.volume}
                                          thedisplaypreset={thedisplaypreset}
                                          watchlist={thetype == "watchlist"}
                                      />
                                  )) 
                            : listofallentries.map((stock) => (
                                  <StockInfo
                                      key={stock.id}
                                      id={stock.id}
                                      name={stock.name}
                                      price={stock.price}
                                      change={stock.change}
                                      cap={stock.cap}
                                      volume={stock.volume}
                                      thedisplaypreset={thedisplaypreset}
                                      watchlist={thetype == "watchlist"}
                                  />
                              ))}
                    </div>
                )}
                {listofallentries.length < alltickers.length &&
                thequantity == -1 ? (
                    <button className="btn-dark-purple" onClick={refreshButton}>
                        SHOW MORE STOCKS
                    </button>
                ) : (
                    ""
                )} 
            </div>
        </div>
    );
}

export default StockInfoList;
