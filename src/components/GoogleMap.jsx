import React from 'react';

const GoogleMap = () => {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1117.2215400983787!2d-3.1818349999999587!3d55.941692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0xe6c3b215413fca2f!2sThe+Wee+Boulangerie!5e0!3m2!1sfr!2suk!4v1425649898874"
            width="100%" height="400" style={{ border: 0, borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
            allowFullScreen="" loading="lazy">
        </iframe>
    );
}

export default GoogleMap;
