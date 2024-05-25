import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

// "symbol" referes to ticker symbol, which is a unique series of letters assigned to a publicly traded company e.g. GOOGL etc.

// replace with your API call to fetch stocks
const mockStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
];

function AlertsPage() {
    const [watchList, setWatchList] = useState([]);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        // Replace the line below with an API call backend - list of all stocks
        setStocks(mockStocks); 
    }, []);

    const addToWatchList = (stock) => {
        if (!watchList.some(w => w.symbol === stock.symbol)) {
            // add new stock in the watch list - update backend
            setWatchList([...watchList, stock]);
        }
    };

    const removeFromWatchList = (symbol) => {
        //  remove this stock from the watch list- update in backend
        setWatchList(watchList.filter(s => s.symbol !== symbol));
    };

    return (
        <>
            <NavBar />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Available Stocks</h2>
                        <ul className="list-group">
                            {stocks.map(stock => (
                                <li key={stock.symbol} className="list-group-item d-flex justify-content-between align-items-center">
                                    {stock.name} ({stock.symbol})
                                    <button className="btn btn-small btn-primary" onClick={() => addToWatchList(stock)}>Alert</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h2>Watching</h2>
                        <ul className="list-group">
                            {watchList.map(stock => (
                                <li key={stock.symbol} className="list-group-item d-flex justify-content-between align-items-center">
                                    {stock.name} ({stock.symbol})
                                    <button className="btn btn-small btn-danger" onClick={() => removeFromWatchList(stock.symbol)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AlertsPage;
