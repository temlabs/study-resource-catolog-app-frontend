import { useEffect, useState } from "react";

import { NewResourceProps, ResourcePost } from "./utils/interfaces";

export default function Newresource(props: NewResourceProps): JSX.Element {
  const [resource, setResource] = useState<ResourcePost>({
    user_id: props.user_id,
    resource_name: "",
    author_name: "",
    url: "",
    description: "",
    tags: [""],
    content_name: "",
    build_stage: "",
    recommendation_nature: "",
    recommendation_reason: "",
  });

  useEffect(() => {
    setResource(Object.assign(resource, { user_id: props.user_id }));
  }, [props.user_id, resource]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNature, setSelectedNature] = useState("");

  const handleAddTag = (value: string) => {
    setSelectedTags((prevSelectedTags) => [...prevSelectedTags, value]);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(resource),
    };
    fetch(
      "https://study-resource-catalog-backend.herokuapp.com/resource",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("success", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <h3 className="title">Add new resource</h3>
      <div className="leftContainer">
        <input
          value={resource.resource_name}
          name="resource_name"
          type="text"
          placeholder="Resource Name:"
          onChange={handleChange}
        />
        <br></br>
        <input
          value={resource.author_name}
          name="author_name"
          type="text"
          placeholder="Author Name:"
          onChange={handleChange}
        />
        <br></br>
        <input
          value={resource.url}
          name="url"
          type="text"
          placeholder="URL:"
          onChange={handleChange}
        />
        <br></br>
        <input
          value={resource.build_stage}
          name="build_stage"
          type="text"
          placeholder="Build Stage:"
          onChange={handleChange}
        />
        <br></br>
      </div>
      <div className="rightFreeTextContainer">
        <textarea
          value={resource.description}
          name="description"
          placeholder="Description:"
          onChange={handleChange}
        />
      </div>
      <div className="leftContainer">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectedNature.length > 0
              ? selectedNature
              : "choose recommendation nature:"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li
              className="dropdown-item"
              onClick={() =>
                setSelectedNature(
                  "I recommend this resource after having used it"
                )
              }
            >
              Recommended
            </li>
            <li
              className="dropdown-item"
              onClick={() =>
                setSelectedNature(
                  "I do not recommend this resource, having used it"
                )
              }
            >
              Not recommended
            </li>
            <li
              className="dropdown-item"
              onClick={() =>
                setSelectedNature(
                  "I haven't used this resource but it looks promising"
                )
              }
            >
              Haven't used
            </li>
          </ul>
        </div>
        <br></br>
        <br></br>
        <div className="tagdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tag selector
          </button>
          <ul
            className="dropdown-menu btn btn-info"
            aria-labelledby="dropdownMenuButton1"
          >
            {props.tags.map((tag, index) => {
              return (
                <li
                  className="dropdown-tags dropdown-item"
                  onClick={(e) => handleAddTag(tag)}
                  key={index}
                >
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
        <br></br>
        <div>
          {selectedTags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
      </div>
      <div className="rightFreeTextContainer">
        <textarea
          value={resource.recommendation_reason}
          name="recommendation_reason"
          placeholder="Recommendation Reason:"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleClick}>
        Submit your resource!
      </button>
    </div>
  );
}
