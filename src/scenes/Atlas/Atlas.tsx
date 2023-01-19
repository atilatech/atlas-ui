import React from 'react';
import SearchAtlas from '../../components/Search/SearchAtlas';

function Atlas() {

    return (
        <div>
        <div className="Atlas container card shadow my-5 p-5">
            <h1 className="text-center">
                Atlas
            </h1>
            <h3 className="text-center">
                Search any Youtube video
            </h3>
            <SearchAtlas />
        </div>
        </div>
    );
}

export default Atlas;