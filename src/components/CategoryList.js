import { useEffect, useState } from "react";
import { addCategory, getCategories } from "../core/local";
import CategoryDetails from "./CategoryDetails";

export default function CategoryList() {
    const [state, setState] = useState({ category: '' });
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        setCategories(getCategories());
    }, [update]);

    const inputChange = (e) => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const category = addCategory(categories, state.category);
        setCategories([...categories, category]);
    }

    const onDelete = () => {
        setUpdate(!update);
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
            <div>
                {categories.map((category, index) => (
                    <div key={index} className="mb-3">
                        <CategoryDetails category={category} onDelete={onDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
}