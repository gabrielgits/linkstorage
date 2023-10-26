
import React from 'react';

export default function Filters({ filters, setFilters, categories }) {
  return (
    <div className="container mt-3">
      {categories.map((category) => {
        const contain = filters.includes(category.name);
        return (
          <label
            key={category.name}
            className={`badge ${contain ? 'bg-danger' : 'bg-light'}`}
            style={{ cursor: 'pointer', marginRight: '5px' }}
            onClick={() => {
              if (contain) {
                filters.delete(category.name);
              } else {
                filters.add(category.name);
              }
              setFilters(new Set(filters));
            }}
          >
            {category.name}
          </label>
        );
      })}
    </div>
  );
}
