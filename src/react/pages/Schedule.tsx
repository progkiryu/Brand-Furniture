import "../styles/Schedule.css";
import "../styles/Global.css";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Searchbar from "../components/Searchbar";

function Schedule() {
    return (
        <>
            <Navbar />
            <div id="first-container">
                <div id="header-container">
                    <h1>Schedule</h1>
                </div>
                <div id="schedule-first-container">
                    <div id="search-container">
                        <h1>Search</h1>
                        <Searchbar />
                    </div>
                    <div id="filter-container">
                        <h1>Filter</h1>
                    </div>
                </div>
                <div id="order-container">
                    <h1>Orders</h1>
                    <Table />
                </div>
            </div>
        </>
    )
}

export default Schedule;