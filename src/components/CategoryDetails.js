
import React from "react";
import { deleteCategory } from "../core/local";

export default function CategoryDetails({ category, onDelete }) {
  const handleDelete = () => {
    deleteCategory(category);
    onDelete(category);
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Category Details</h5>
          <p className="card-text">Category: {category}</p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
