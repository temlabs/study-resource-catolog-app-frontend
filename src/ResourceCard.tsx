import axios from "axios";
import { ResourceProp, UserProps } from "./utils/interfaces";
import { baseUrl } from "./baseURL";

interface ResourceCardProps {
  resource: ResourceProp;
  user: UserProps;
}

function ResourceCard(props: ResourceCardProps): JSX.Element {
  const addToStudyList = () => {
    axios.post(`${baseUrl}/studylist`, {
      user_id: props.user.user_id,
      resource_id: props.resource.resource_id,
    });
  };
  const addLike = () => {
    axios.post(`${baseUrl}/reaction`, {
      resource_id: props.resource.resource_id,
      user_id: props.user.user_id,
      polarity: 1,
    });
  };
  const addDislike = () => {
    axios.post(`${baseUrl}/reaction`, {
      resource_id: props.resource.resource_id,
      user_id: props.user.user_id,
      polarity: -1,
    });
  };
  console.log(props.resource.tags)
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.resource.resource_name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.resource.author_name}</h6>

        <a href={props.resource.url} className="card-link">
          {props.resource.url}
        </a>
        <p className="card-text"> {props.resource.description}</p>
        <p className="card-text"> {props.resource.recommendation_reason}</p>
        <p className="card-text"> {props.resource.recommendation_nature}</p>
        <span className="badge badge-primary">
          {props.resource.content_name}
        </span>
        {props.resource.tags ? props.resource.tags.split(",").map((tag, ix) => (
          <span key={ix} className="badge badge-primary">
            {tag}
          </span>
        )) : "No tags"}
        <span className="badge badge-primary">
          {props.resource.build_stage}
        </span>
        <hr></hr>
        <button type="button" className="btn btn-success" onClick={addLike}>
          Likes{" "}
          <span className="badge badge-light">
            {props.resource.upvote_reaction}
          </span>
          <span className="sr-only"></span>
        </button>
        <button type="button" className="btn btn-danger" onClick={addDislike}>
          Dislikes{" "}
          <span className="badge badge-light">
            {props.resource.downvote_reaction}
          </span>
          <span className="sr-only"></span>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={addToStudyList}
        >
          Add to Study List <span className="badge badge-light"></span>
        </button>
      </div>
    </div>
  );
}
export default ResourceCard;
