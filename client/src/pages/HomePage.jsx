import React from 'react';
import PrivateRouting from '../components/Routings/PrivateRouting';

const HomePage = () => {
    return (
        <PrivateRouting>
            <h1>Homepage</h1>
        </PrivateRouting>
    );
};

export default HomePage;