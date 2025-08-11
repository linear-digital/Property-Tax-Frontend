import React from 'react';
import Pages from './Pages';

const SearchResults = ({ query }: { query: string}) => {
    return (
        <div
            className='absolute top-[70px] left-0 right-0 bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 px-4 md:px-5 py-3 z-[800] shadow-md rounded-md overflow-hidden min-h-[300px] w-full'
        >
            <Pages query={query} />
        </div>
    );
};

export default SearchResults;