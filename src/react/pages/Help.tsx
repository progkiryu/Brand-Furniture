import "../styles/Global.css";
import "../styles/Help.css";
import Navbar from "../components/Navbar";

function Help() {
  return (
    <>
      <Navbar />
      <div id="first-container">
        <div className="help-content">
          <h2>How to Use Threadline:</h2>

          <p>Insert user manual link</p>
        </div>
      </div>
    </>
  );
}

export default Help;
