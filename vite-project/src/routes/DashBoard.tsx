import DashboardComonent from "../components/dashboardcomponent";
import NavBar from "../components/navbar";
import "../styles/dashboard.css"


function DashBoard() {
    return (
        <>
            <NavBar rightsignup={false}/>
            <div className="dashboard-components">
            <div className="dashboard-component">
            <DashboardComonent thegap={4} thequantity={6} thewidth={"100%"} thetype={"portfolio"} thetitle="Portfolio" thepreset={1}/>
            </div>
            <div className="dashboard-component">
            <DashboardComonent thegap={4} thequantity={6} thewidth={"100%"} thetype={"watchlist"} thetitle="Watchlist" thepreset={2} />
            </div>
            <div className="dashboard-component">
            <DashboardComonent thegap={2} thequantity={3} thewidth={"90%"} thetype={"stocklist"} thetitle="More Stocks..." thepreset={0} />
            </div>
        </div>
            
            {/* <div className="stockentries">
                <StockInfoList/>
            </div> */}
        </>
    );
}

export default DashBoard;
