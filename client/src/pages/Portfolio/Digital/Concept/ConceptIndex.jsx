import { GetAll } from "../../../../hooks/useGet";
import ConceptCard from "./components/ConceptCard";
import { Link } from "react-router-dom";
import DigitalHeader from "../../../../components/DigitalHeader";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function ConceptIndex() {
    const { payloads, isPending, error } = GetAll("concept");
    const { user } = useAuthContext();

    return (
        <div id="Index">
            <div className="section">
                <DigitalHeader header="Concept Art" link="/portfolio" />
                {error && <div className="error">{error}</div>}
                {isPending && <div>Loading...</div>}
                {user && (
                    <div className="button-group">
                        <button className="btn btn-light"><Link to="/portfolio/concept/add">+</Link></button>
                    </div>
                )}
            </div>
            <div className="information">
                {payloads === null ? <div className="information">Whole lot of nothing</div>
                    : payloads.map((payload, i) => {
                        return (
                            <ConceptCard payload={payload} />
                        );
                    })}
            </div>
        </div>
    );
}

export default ConceptIndex;