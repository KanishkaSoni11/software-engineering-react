import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";
//
const MyDislikes = () => {
    const [unlikedTuits, setUnlikedTuis] = useState([]);
    const findTuitsIUnLike = () =>
        service.findAllTuitsUnLikedByUser("me")
            .then((tuits) => setUnlikedTuis(tuits));
    useEffect(findTuitsIUnLike, []);

    return (
        <div>
            <h2>My Dislikes</h2>
            <Tuits tuits={unlikedTuits} refreshTuits={findTuitsIUnLike}/>
        </div>
    );
};

export default MyDislikes;