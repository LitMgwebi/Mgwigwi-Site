import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";

function AnimationCard({ payload }) {
    return (
        <Card className="card">
            <Link
                to={`/portfolio/animation/${payload._id}`}
                state={{stateId: payload._id}}
            >
                <CardHeader className="cardHeader" title={payload.title}/>
                <CardMedia
                    component="video"
                    alt={payload.title}
                    image={payload.preview}
                    className="cardMedia"
                    autoPlay
                />
            </Link>
        </Card>
    );
}

export default AnimationCard;