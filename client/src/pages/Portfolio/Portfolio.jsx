import LinkCard from "../../components/LinkCard";
import ProjectHeader from "../../components/ProjectHeader";
import { useState } from "react";
import FlipCard from "../../components/FlipCard";
import ReactCardFlip from "react-card-flip";
import { useLocation } from "react-router";
import Digital from "./Digital/Digital";
import { useEffect } from "react";

function Portfolio() {
    const [flip, setFlip] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(location.state){
            setFlip(true)
        }
    }, [location])

    const handleClick = () => setFlip(!flip);
    return (
        <div id="Menu">
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                <div>
                    <ProjectHeader header="Portfolio" link="/" />
                    <div className="information">
                        <FlipCard
                            handleFlip={handleClick}
                            contentHeader="Digital"
                            imgLink={require("../../media/digital-drawing.png")}
                        />
                        <LinkCard
                            routeLink="fine-art"
                            contentHeader="Fine Art"
                            imgLink={require("../../media/fine-art.png")}
                        />
                        <LinkCard
                            routeLink="animation"
                            contentHeader="Animation"
                            imgLink={require("../../media/animation.png")}
                        />
                    </div>
                </div>
                <div id="Digital">
                    <Digital handleFlip={handleClick} />
                </div>
            </ReactCardFlip>
        </div>
    )
}

export default Portfolio;