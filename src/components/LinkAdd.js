import { useEffect, useState } from "react";
import { getCategories, saveLink } from "../core/local";
import { useNavigate } from "react-router-dom";

export default function LinkAdd() {
    const [state, setState] = useState({ title: '', link: '', categories: [] });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        setCategories(getCategories());
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const sucess = saveLink(state);
        if (sucess) {
            navigate('/');
            //alert('Link save successfully');
            return;
        }
        alert('It is not possible to save...');
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const selectChange = (e) => {
        const { value } = e.target;
        const cats = state.categories;
        cats.push(value);
        //setCategory(value);
        setState({ ...state, categories: cats });
    }
    const deleteCategory = (e) => {
        const cats = state.categories;
        const index = cats.indexOf(e.target.value);
        cats.splice(index, 1);
        setState({ ...state, categories: cats });
    }

    const showAddCategory = () => {
        navigate('/categories');
    }

    const pasteLink = async () => {
        const link = await navigator.clipboard.readText();
        const linkArray = link.split("/");
        setState({ ...state, link, title: linkArray[linkArray.length - 1] });
    }


    return (
        <div className="container mt-5">
            <input type="button" onClick={pasteLink} value="Paste Link" className="btn btn-secondary mt-2" />
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    value={state.title}
                    name="title"
                    onChange={inputChange}
                    className="form-control"
                    id="title"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="link">Link</label>
                <input
                    value={state.link}
                    name="link"
                    onChange={inputChange}
                    className="form-control"
                    id="link"
                    required
                />

            </div>
            <div className="mb-3">
                <button className="btn btn-danger" onClick={showAddCategory}>
                    New Category
                </button>
                <h3>Categories Selected</h3>
                {state.categories.map((category, index) => (
                    <span onClick={deleteCategory} key={index} className="badge bg-info mx-2">
                        {category}&nbsp;[X]
                    </span>
                ))}
            </div>
            <div className="mb-3">
                <select name="category" onChange={selectChange} className="form-select">
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" onClick={onSubmit} className="btn btn-primary">
                Save
            </button>

        </div>
    );

}