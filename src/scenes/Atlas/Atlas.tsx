import React from 'react';
import Footer from '../../components/Footer/Footer';
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

        <Footer />
        </div>
    );
}

export default Atlas;