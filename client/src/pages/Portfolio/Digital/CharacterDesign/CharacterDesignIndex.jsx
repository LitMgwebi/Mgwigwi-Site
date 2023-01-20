import { GetAll } from "../../../../hooks/useGet";
import ProjectHeader from "../../../../components/ProjectHeader";
import CDCard from "./components/CDCard";
import { Link } from "react-router-dom";

function CharacterDesignIndex(){
    const { payloads, isPending, error } = GetAll("characterDesign");

    return (
        <div id="Index">
            <div className="section">
                <ProjectHeader header="Character Design" link="/portfolio" />
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}
                <div className="addButton">
                    <button><Link to="/portfolio/character-design/add">Add</Link></button>
                </div>
            </div>
            <div className="information">
                {payloads && payloads.map((payload, i) => {
                    return (
                        <CDCard payload={payload} />
                    );
                })}
            </div>
        </div>
    )
    
}

export default CharacterDesignIndex;