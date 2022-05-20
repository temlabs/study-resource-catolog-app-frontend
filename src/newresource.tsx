import { useEffect, useState } from "react";

import { NewResourceProps, ResourcePost } from "./utils/interfaces";

export default function Newresource(props: NewResourceProps): JSX.Element {
  const [resource, setResource] = useState<ResourcePost>({
    user_id: props.user_id,
    resource_name: "",
    author_name: "",
    url: "",
    description: "",
    tags: [],
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

  const handleAddTag = (value: string, listElement: HTMLLIElement) => {
    const tagIndex = selectedTags.findIndex((t) => t === value);
    const alreadySelected: boolean = tagIndex === -1 ? false : true;

    if (alreadySelected) {
      listElement.classList.remove("selected-tag");
      const newSelectedTags = [...selectedTags];
      newSelectedTags.splice(tagIndex, 1);
      setSelectedTags(newSelectedTags);
    } else {
      listElement.classList.add("selected-tag");
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, value]);
    }
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (!validateResource()) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(resource),
    };

    fetch(
      "https://study-resource-catalog-backend.herokuapp.com/resource",
      requestOptions
    )
      .then((response) => {
        if (response.status === 500) {
          throw response;
        }
        return response.json();
      })
      .then((result) => {
        console.log("success", result);
      })
      .catch(async (error) => {
        if (error.status !== undefined) {
          const responseBody = await error.json();
          window.alert(
            `${responseBody}. Please note that all fields are compulsory.`
          );
        } else {
          window.alert(error);
        }
      });
  };

  function validateResource(): boolean {
    const resourceNameNotBlank = resource.resource_name.length > 0;
    const authorNameNotBlank = resource.author_name.length > 0;
    const urlNotBlank = resource.url.length > 0;
    const atLeastOneTag = selectedTags.length > 0;

    const allChecksMet =
      resourceNameNotBlank &&
      authorNameNotBlank &&
      urlNotBlank &&
      atLeastOneTag;
    if (!allChecksMet) {
      window.alert("All fields are mandatory");
      return false;
    }
    return true;
  }

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
                  onClick={(e) => handleAddTag(tag, e.target as HTMLLIElement)}
                  key={tag}
                >
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
        <br></br>
        <div>
          {selectedTags.map((tag) => (
            <p key={tag}>{tag}</p>
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
