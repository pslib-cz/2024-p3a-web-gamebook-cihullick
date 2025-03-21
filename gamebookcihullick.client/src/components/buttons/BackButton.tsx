import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonModule from '../buttons/button.module.css';

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button className={ButtonModule.btn} onClick={() => navigate(-1)}>Back</button>
    );
};

export default BackButton;
