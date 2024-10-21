import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [company, setCompany] = useState('');
  const [sort, setSort] = useState('');
  const [price, setPrice] = useState(0);

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleCompanyChange(event) {
    setCompany(event.target.value);
  }

  function handleSortChange(event) {
    setSort(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleSearch() {
    onFilterChange({ search, category, company, sort, price });
  }

  function handleReset() {
    setSearch('');
    setCategory('all');
    setCompany('');
    setSort('');
    setPrice(0);
    onFilterChange({ search: '', category: 'all', company: '', sort: '', price: 0 });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-blue-50 rounded-lg shadow-md">
      <div className="flex gap-5">
        <span className="flex flex-col">
          <p className="text-gray-600 mb-2">Search Product</p>
          <input type="text" value={search} onChange={handleSearchChange} className="p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </span>

        <span className="flex flex-col">
          <p className="text-gray-600 mb-2">Select Category</p>
          <select value={category} onChange={handleCategoryChange} className="p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="all">all</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </span>

        <span className="flex flex-col">
          <p className="text-gray-600 mb-2">Select Company</p>
          <select value={company} onChange={handleCompanyChange} className="p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">all</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </span>

        <span className="flex flex-col">
          <p className="text-gray-600 mb-2">Sort By</p>
          <select value={sort} onChange={handleSortChange} className="p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="az">a-z</option>
            <option value="za">z-a</option>
            <option value="high">high</option>
            <option value="low">low</option>
          </select>
        </span>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Select Price</p>
          <span className="text-lg font-medium">${price}.00</span>
          <input
            type="range"
            min="0"
            max="1000"
            value={price}
            className="w-full h-2 bg-blue-500 rounded-lg cursor-pointer"
            onChange={handlePriceChange}
          />
          <div className="flex justify-between text-gray-500 text-sm">
            <span>0</span>
            <span>Max : $1,000.00</span>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-4">
          <label className="flex items-center">
            Free Shipping
            <input type="checkbox" className="ml-2" />
          </label>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSearch}>SEARCH</button>
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg" onClick={handleReset}>RESET</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;