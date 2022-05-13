// to add below line to main.tsx
// import Newresource from "./newresource";

// onClick handler to package up object and post resource

import { useState, useEffect } from "react";

interface ResourcePost {
  user_id: number;
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  tags: string[];
  content_name: string;
  build_stage: string;
  recommendation_nature: string;
  recommendation_reason: string;
}

export default function Newresource(props: ResourcePost): JSX.Element {
  const [resource, setResource] = useState({
    user_id: 0,
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
        />{" "}
        <br></br>
        <input
          value={resource.author_name}
          name="author_name"
          type="text"
          placeholder="Author Name:"
          onChange={handleChange}
        />{" "}
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
        <textarea id="freetextbox">Description:</textarea>
      </div>
      <div className="leftContainer">
        <select>
          <option value="I recommend this resource after having used it">
            Recommended
          </option>
          <option value="I do not recommend this resource, having used it">
            Not Recommended
          </option>
          <option value="I haven't used this resource but it looks promising">
            Haven't used yet
          </option>
        </select>
        <br></br>
        <input type="text" onChange={handleChange}>
          Content Type:
        </input>
        <br></br>
        <input type="text">TAGS</input> <br></br>
      </div>
      <div className="rightFreeTextContainer">
        <textarea id="freetextbox">Recommendation Reason:</textarea>
      </div>
      <button type="submit" onClick={handleClick}> Submit your resource! </button>
    </div>
  );
}
