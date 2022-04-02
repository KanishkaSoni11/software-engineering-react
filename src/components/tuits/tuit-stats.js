import React from "react";

const TuitStats = ({
                       tuit, likeTuit, unlikeTuit = () => {
    }
                   }) => {
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats &&
                 <span className="ttr-stats-replies">{tuit.stats.replies}</span>
                }
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats &&
                 <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
                }
            </div>


            <div className="col">
                <span onClick={() => likeTuit(tuit)}>
                  {
                      tuit.stats && tuit.stats.likes ? <i className="fa-solid fa-thumbs-up"></i> :
                      <i className="fa-regular fa-thumbs-up"></i>
                  }
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>


            <div className="col">
          <span className="ttr-unlike-tuit-click" onClick={() => unlikeTuit(tuit)}>
                 {
                     tuit.stats && tuit.stats.unlikes ? <i class="fa-solid fa-thumbs-down"></i> :
                     <i className="fa-regular fa-thumbs-down"></i>
                 }
              <span className="ttr-unlike-tuit-click">{tuit.stats && tuit.stats.unlikes}</span>
          </span>
            </div>

            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;