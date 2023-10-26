import { useState } from "react";
import { addCategorySimple } from "../core/local";

export default function CategoryAdd() {
    const [state, setState] = useState({ category: '' });


    const inputChange = (e) => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
         addCategorySimple(e.target.value);
      
    }

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <form method="post" onSubmit={onSubmit} className="d-flex">
                    <div className="form-group flex-grow-1 me-3">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={state.category}
                            onChange={inputChange}
                            className="form-control"
                            id="category"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );

}