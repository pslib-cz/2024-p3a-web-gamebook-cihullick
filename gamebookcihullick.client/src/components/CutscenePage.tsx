import { Cutscene } from '../types';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CutsceneModule from '../components/cutscenepage.module.css';

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

    if (loading) return <p className={ CutsceneModule.loading }>Loading cutscene...</p>;
    if (!cutscene) return <p className={ CutsceneModule.error }>No cutscene found.</p>;

    return (
        <div className={ CutsceneModule.container } onClick={handleNextCutscene}>
            <div className={ CutsceneModule.cutscene_container }>
                <img
                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${cutscene.image.pathToFile}.webp`}
                    alt={cutscene.name}
                    className={ CutsceneModule.cutscene_img }
                />
                <div className={ CutsceneModule.cutscene_textbox }>
                    <p className={ CutsceneModule.cutscene_text }>{cutscene.text}</p>
                    <p className={ CutsceneModule.cutscene_text }>(click anywhere to proceed)</p>
                </div>
            </div>
        </div>
        
    );
};

export default CutscenePage;
