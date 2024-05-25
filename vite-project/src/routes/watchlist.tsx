import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/bootstrap_override.css";
import StockInfoList from "../components/stockinfolist";

// Dummy data to integrate with an endpoint
// const wishlist = [
//     { companyName: "Microsoft Corp", companySymbol: "MSFT", currentPrice: "£230.21", priceChange: "+130%" },
//     { companyName: "Apple Inc", companySymbol: "AAPL", currentPrice: "£300.12", priceChange: "+120%" },
//     { companyName: "Tesla Inc", companySymbol: "TSLA", currentPrice: "£600.43", priceChange: "-110%" },
//     { companyName: "Amazon.com Inc", companySymbol: "AMZN", currentPrice: "£3100.30", priceChange: "+100%" },
//     { companyName: "Google LLC", companySymbol: "GOOGL", currentPrice: "£2803.50", priceChange: "-90%" },
//     { companyName: "Facebook Inc", companySymbol: "FB", currentPrice: "£350.21", priceChange: "-80%" },
//     { companyName: "Netflix Inc", companySymbol: "NFLX", currentPrice: "£650.12", priceChange: "+70%" },
//     { companyName: "Adobe Inc", companySymbol: "ADBE", currentPrice: "£530.43", priceChange: "+60%" },
//     { companyName: "Salesforce", companySymbol: "CRM", currentPrice: "£250.32", priceChange: "-50%" },
// ];

function Watchlist() {
    return (
        <>
            <NavBar rightsignup={false} />
            <div className="stockentries">
                <StockInfoList
                    thegap={10}
                    thetype={"watchlist"}
                    thewidth={"70%"}
                    thequantity={-1}
                    thetitle={"Watchlist"}
                    thedisplaypreset={0}
                />
            </div>
        </>
    );

    // const getPriceChangeClass = (priceChange) => {
    //     return priceChange.startsWith('+') ? 'text-success' : 'text-danger';
    // };

    // return (
    //     <>
    //         <NavBar rightsignup={true} />
    //         <main className="container my-5">
    //             <div className="row justify-content-center">
    //                 <div className="col-12">
    //                     <h1 className="display-4 mb-4 text-white text-center">Stock Wishlist</h1>
    //                     <div className="wishlist-container" style={{ color: 'white' }}>
    //                         {wishlist.map((stock, index) => (
    //                             <div key={index} className="card mb-3" style={{ background: 'none', borderColor: 'white' }}>
    //                                 <div className="card-body d-flex justify-content-between align-items-center">
    //                                     <div>
    //                                         <h5 className="card-title">{stock.companyName} ({stock.companySymbol})</h5>
    //                                         <p className="card-text">Current Price: {stock.currentPrice}</p>
    //                                         {/* Colour change*/}
    //                                         <p className={`card-text ${getPriceChangeClass(stock.priceChange)}`}>Price Change: {stock.priceChange}</p>
    //                                     </div>
    //                                     <div>
    //                                         <button className="btn btn-primary me-2">Trade</button>
    //                                         <button className="btn btn-danger">Remove</button>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             </div>
    //         </main>
    //         <Footer />
    //     </>
    // );
}

export default Watchlist;
