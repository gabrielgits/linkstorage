import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkDetails from "./LinkDetails";
import CONSTANTS from "../core/constants";
import { useContext } from "react";
import GlobalContext from "../core/context";
import { useMemo } from "react";

export default function Home() {
  const {globalState} = useContext(GlobalContext);
  const [state, setState] = useState({
    links: [],
    categories: [],
    categoryFilter: [],
  });
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(CONSTANTS.key_session);
    navigate('/login');
  }

  useEffect(() => {
    let categories = [];
    globalState.links.forEach((link) => {
      link.categories.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });

    setState({
      links: globalState.links,
      categories,
      categoryFilter: [],
    });
  }, [globalState.links, globalState.categories]);

  useEffect(() => {

  }, [state.categoryFilter]);

  useMemo(() => {
    state.categoryFilter.forEach((category) => {
      const links = state.links.filter((link) => link.categories.includes(category));
      setState({ ...state, links });
    });
  }, [state.categoryFilter]);

  const onChangeFilter = (e) => {
    const category = e.target.value;
    if (!state.categoryFilter.includes(category)) {
      setState({
        ...state,
        categoryFilter: [...state.categoryFilter, category],
      });
      return;
    }
    setState({
      ...state,
      links: globalState.links,
      categoryFilter: state.categoryFilter.filter((c) => c !== category),
    });
  }

  const goAdd = () => {
    navigate('add-link');
  }

  const goCategories = () => {
    navigate('categories');
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
        <button className="btn btn-success" onClick={goAdd}>
          Add New Link
        </button>
        <button className="btn btn-info" onClick={goCategories}>
          Categories
        </button>
      </div>
      <div className="mb-4">
        <h4>Filter</h4>
        <div className="form-check">
          {globalState.categories.map((category, index) => (
            <button
              key={'category' + index}
              onClick={onChangeFilter}
              className={`btn btn-${state.categoryFilter.includes(category) ? 'danger' : 'success'} me-2`}
              style={{ fontSize: "0.9rem" }}
              value={category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4>Links</h4>
        {state.links.map((link) => (
          <LinkDetails key={link.id} link={link} />
        ))}
      </div>
    </div>
  );

}