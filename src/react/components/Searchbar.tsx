import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchChange}
        />
    );
}

export default SearchBar;