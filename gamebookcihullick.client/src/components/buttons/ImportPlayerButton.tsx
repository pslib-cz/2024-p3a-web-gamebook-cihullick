import React from 'react';
import { savePlayer } from '../../services/PlayerService';

const ImportPlayerButton: React.FC = () => {
    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            alert('No file selected!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const playerData = JSON.parse(e.target?.result as string); // Parse JSON data
                savePlayer(playerData); // Save the imported data
                alert('Player data imported successfully!');
                window.location.reload(); // Reload to apply the new player data
            } catch (error) {
                console.error('Error parsing player data:', error); // Log the error
                alert('Invalid file format. Please upload a valid JSON file.');
            }
        };
        reader.readAsText(file); // Read the file as text
    };

    return (
        <label
            style={{
                display: 'inline-block',
                fontSize: '16px',
                padding: '10px 20px',
                margin: '10px',
                cursor: 'pointer',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
            }}
        >
            Import Player Data
            <input
                type="file"
                accept="application/json"
                onChange={handleImport}
                style={{ display: 'none' }} // Hide the actual file input
            />
        </label>
    );
};

export default ImportPlayerButton;
