import HPHeader from '../components/home-page/HPHeader.tsx'
import HPOrder from '../components/home-page/HPOrder.tsx'
// import HPMonthlyProgress from '../components/home-page/HPMonthlyProgress.tsx'
import HPJobAnalytics from '../components/home-page/HPJobAnalytics.tsx'
import HPNotifications from '../components/home-page/HPNotifications.tsx'

function HomePage(){
    return(
        <>
            {/* <div className="dashboard"> 
                <NavBar/> */}
                <div className="dbp-right-container">
                    <HPHeader/>
                    <div className="dbp-uo-ja-n-es-container">
                        <HPOrder/>
                        <div className="dbp-ja-n-es-container">
                            <HPJobAnalytics/>
                            <HPNotifications/>
                        </div>
                    </div>
                </div>
            {/* </div>  */}

        </>
    );
}

export default HomePage;