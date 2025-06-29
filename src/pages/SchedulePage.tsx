import SPSchedule from "../components/schedule-page/SPSchedule";

function SchedulePage() {
  return (<>
    <div className="sp-right-container">
      <div className="sp-actions-container">
        <div className="sp-add-jobs-btn-container">
          <input type="button" value="[+] Add Job"></input>
        </div>
        <div className="sp-search-container">
          <input type="search" placeholder="Search"></input>
        </div>
        <div className="sp-filter-container">
          <select name="cars" id="cars">
            <option value="date">by date</option>
            <option value="priority">by priority</option>
            <option value="chair">by chair</option>
            <option value="type">by type</option>
          </select>
        </div>
        <div className="sp-archive-btn-container">
          <input type="button" value="Archive"></input>
        </div>
        <div className="sp-color-selection">
          <p>Color Tags</p>
        </div>
      </div>
      <div className="sp-schedule-container">
        <SPSchedule />
      </div>
    </div>
  </>)
}

export default SchedulePage;