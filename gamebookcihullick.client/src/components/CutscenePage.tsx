import { Cutscene } from '../types';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CutsceneModule from '../components/cutscenepage.module.css';

const CutscenePage = () => {
    const { id } = useParams<{ id: string }>();
    const [cutscene, setCutscene] = useState<Cutscene | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const fetchCutscene = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Cutscenes/${id}`);
            const data = await response.json();
            setCutscene(data);
        };

        fetchCutscene();
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

    if (!cutscene) return <div className={CutsceneModule.loading}>Loading...</div>;
    return (
        <div className={ CutsceneModule.container } onClick={handleNextCutscene}>
            <div className={ CutsceneModule.cutscene_container }>
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${cutscene.image.pathToFile}.webp`}
                     alt={cutscene.name}
                     className={ CutsceneModule.cutscene_img }/>
                <div className={ CutsceneModule.cutscene_textbox }>
                    <p className={ CutsceneModule.cutscene_text }>{cutscene.text}</p>
                    <p className={ CutsceneModule.cutscene_text }>(click anywhere to proceed)</p>
                </div>
            </div>
        </div>
        
    );
};

export default CutscenePage;
