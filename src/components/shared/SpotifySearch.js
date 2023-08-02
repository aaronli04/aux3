import React, { useState, useCallback } from 'react';
import { GoSearch } from 'react-icons/go';
import { getPCN } from "@/utils/classes";

const className = 'spotify-search';
const pcn = getPCN(className)

export default function SpotifySearch() {
    const [filteredItems, setFilteredItems] = useState([]);

    const handleEnterKey = useCallback((event) => {
        if (event.key === 'Enter') {
            // search spotify and set filteredItems
            console.log(event.target.value)
            setFilteredItems([])
        }
    })

    const renderSearchResults = useCallback(() => (
        <div className={pcn('__search-results')}>
            {filteredItems && filteredItems.map((item, index) =>
                <div className={pcn('__search-result')} key={index}>
                    <div className={pcn('__search-result-title')}>
                        {item.name}
                    </div>
                </div>
            )}
        </div>
    ), [filteredItems])

    return (
        <div className={className}>
            <div className={pcn('__liner')}>
                <div className={pcn('__searchbar')}>
                    <GoSearch className={pcn('__search-icon')} size={25} />
                    <input className={pcn('__search-text')} placeholder='Search and press enter' onKeyDown={handleEnterKey} />
                </div>
                <div className={pcn('__separator')} />
                {renderSearchResults()}
            </div>
        </div>
    )
}