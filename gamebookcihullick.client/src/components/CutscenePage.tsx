import { Cutscene } from '../types';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CutscenePage = () => {
    const { id } = useParams<{ id: string }>();
    const [cutscene, setCutscene] = useState<Cutscene | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Cutscenes/${id}`)
            .then((response) => response.json())
            .then((data: Cutscene) => setCutscene(data))
            .catch((error) => console.error("Error fetching cutscene:", error))
            .finally(() => setLoading(false));
    }, [id]);

    const handleNextCutscene = () => {
        if (!cutscene) return;

        if (cutscene.nextCutsceneID === 0) {
            switch (cutscene.cutsceneID) {
                case 4:
                    navigate("/location/1");
                    break;
                default:
                    navigate("/");
                    break;
            }
            return;
        }

        navigate(`/cutscene/${cutscene.nextCutsceneID}`);
    };

    if (loading) return <p>Loading cutscene...</p>;
    if (!cutscene) return <p>No cutscene found.</p>;

    return (
        <div className="cutscene-container">
            <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${cutscene.image.pathToFile}.webp`}
                alt={cutscene.name}
                className="cutscene-image"
            />
            <div className="cutscene-textbox" onClick={handleNextCutscene}>
                <p>{cutscene.text}</p>
            </div>
        </div>
    );
};

export default CutscenePage;
