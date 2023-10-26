import { useContext } from "react";
import GlobalContext from "../core/context";
import { deleteLink } from "../core/local";

export default function LinkDetails({ link }) {

  const {globalState, setGlobalState} = useContext(GlobalContext);

  const deleteClick = () => {
    setGlobalState({
      ...globalState,
      links: globalState.links.filter((l) => l.id !== link.id),
    });
    deleteLink(link);
  }

    return (
        <div className="container mt-4 border p-3 rounded">
          <div className="mb-3">
            {link.categories.map((category, index) => (
              <span
                key={index}
                className="badge bg-info me-2"
                style={{ fontSize: "0.9rem" }}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="mb-3">
            <p>ID: {link.id}</p>
            <p>Title: {link.title}</p>
          </div>
          <div className="mb-3">
            <a href={link.link} className="btn btn-primary me-2" target="_self">
              Open on Same Tab
            </a>
            <a
              href={link.link}
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Open on New Tab
            </a>
          </div>
          <div>
            <button className="btn btn-warning me-2">Edit</button>
            <button onClick={deleteClick} className="btn btn-danger">Delete</button>
          </div>
        </div>
      );
      
}