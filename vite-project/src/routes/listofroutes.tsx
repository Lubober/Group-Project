import SampleRoute from "./sampleroute"

function ListOfRoutes(){

    return (
      <>
        <h2>List Of Routes:</h2>
        <SampleRoute name="Log In" link="/login" />
        <SampleRoute name="Sign Up" link="/signup" />
        <SampleRoute name="Dashboard" link="/dashboard" />
        <SampleRoute name="Stock List" link="/stocklist" />
        <SampleRoute name="Single stock page" link="/single_stock_page" />
        <SampleRoute name="Watchlist" link="/watchlist" />
        <SampleRoute name="Portfolio" link="/portfolio" />
        <SampleRoute name="Trade" link="/trade" />
        <SampleRoute name="Account" link="/account" />
        <SampleRoute name="Error" link="/error/404" />
        <SampleRoute name="add money" link="/add-money"/>
        <SampleRoute name = "withdraw money" link = "/withdraw-money"/>
      </>
    )
}

export default ListOfRoutes