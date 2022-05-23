import axios from "axios";
import { ResourceProp, UserProps } from "../utils/interfaces";
import { baseUrl } from "../utils/baseURL";
import { useEffect, useState } from "react";

interface ResourceCardProps {
  resource: ResourceProp;
  user: UserProps;
  likeTrigger: boolean;
  setLikeTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  studyListTrigger: boolean;
  setStudyListTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CommentsProps {
  comment_id: number;
  user_id: number;
  resource_id: number;
  comment_text: string;
  user_name: string;
  is_faculty: boolean;
}

function ResourceCard(props: ResourceCardProps): JSX.Element {
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const [commentsTrigger, setCommentsTrigger] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [addedToStudyList, setAddedToStudyList] = useState<boolean>(false);

  const deleteFromStudyList = async () => {
    try {
      if (props.user.user_id !== 0) {
        const resourceRemovedFromStudyList = await axios.delete(
          `${baseUrl}/study-list/${props.user.user_id}/${props.resource.resource_id}`
        );
        if (resourceRemovedFromStudyList.data.length === 1) {
          window.alert(
            `the resource: ${props.resource.resource_name} has been removed from your studyList`
          );
          console.log(resourceRemovedFromStudyList.data);
          props.setStudyListTrigger(!props.studyListTrigger);
          setAddedToStudyList(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      const checkIfInStudyList = async () => {
        if (props.user.user_id !== 0) {
          const commentsData = await axios.get(
            `${baseUrl}/study-list/${props.user.user_id}/${props.resource.resource_id}`
          );
          if (typeof commentsData.data !== "string") {
            setAddedToStudyList(true);
          }
        }
      };
      checkIfInStudyList();
    } catch (err) {
      console.error(err);
    }
  }, [props.user.user_id, props.studyListTrigger, props.resource.resource_id]);

  const addToStudyList = () => {
    axios.post(`${baseUrl}/studylist`, {
      user_id: props.user.user_id,
      resource_id: props.resource.resource_id,
    });
    props.setStudyListTrigger(!props.studyListTrigger);
    setAddedToStudyList(true);
  };
  const addLike = () => {
    axios.post(`${baseUrl}/reaction`, {
      resource_id: props.resource.resource_id,
      user_id: props.user.user_id,
      polarity: 1,
    });
    props.setLikeTrigger(!props.likeTrigger);
  };
  const addDislike = () => {
    axios.post(`${baseUrl}/reaction`, {
      resource_id: props.resource.resource_id,
      user_id: props.user.user_id,
      polarity: -1,
    });
    props.setLikeTrigger(!props.likeTrigger);
  };

  useEffect(() => {
    try {
      const getComments = async () => {
        if (props.resource.resource_id !== 0) {
          const commentsData = await axios.get(
            `${baseUrl}/comments/${props.resource.resource_id}`
          );
          setComments(commentsData.data);
        }
      };
      getComments();
    } catch (error) {
      console.error(error);
    }
  }, [commentsTrigger, props.resource.resource_id]);

  const postComment = (comment: string) => {
    axios.post(`${baseUrl}/comments`, {
      resource_id: props.resource.resource_id,
      comment_text: comment,
      user_id: props.user.user_id,
    });
    setCommentsTrigger(!commentsTrigger);
    setNewComment("");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.resource.resource_name}</h5>
        <div className="card-body-mid">
          <div className="card-resource-info">
            <h6 className="card-subtitle mb-2 text-muted">
              Author: {props.resource.author_name}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              Posted by: {props.resource.user_name}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              Post date: {props.resource.post_date?.split("T")[0]}
            </h6>
          </div>

          <a href={props.resource.url} className="card-link">
            {props.resource.url}
          </a>
          <p className="card-text">
            {" "}
            Description: {props.resource.description}
          </p>
          <p className="card-text"> {props.resource.recommendation_nature}</p>
          <p className="card-text"> {props.resource.recommendation_reason}</p>
          <div className="badges">
            <span className="badge text-bg-primary">
              {props.resource.content_name}
            </span>
            {props.resource.tags
              ? props.resource.tags.split(",").map((tag, ix) => (
                <span key={ix} className="badge text-bg-success">
                  {tag}
                </span>
              ))
              : "No tags"}
            <span className="badge text-bg-warning">
              {props.resource.build_stage}
            </span>
          </div>
        </div>
        <div className="card-body-foot">
          <div className="interaction-buttons">
            <div className="card-footer-buttons-reactions">
              <button
                type="button"
                className="btn btn-success"
                onClick={addLike}
              >
                Likes{" "}
                <span className="badge badge-light">
                  {props.resource.upvote_reaction}
                </span>
                <span className="sr-only"></span>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={addDislike}
              >
                Dislikes{" "}
                <span className="badge badge-light">
                  {props.resource.downvote_reaction}
                </span>
                <span className="sr-only"></span>
              </button>
            </div>
            {addedToStudyList ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={deleteFromStudyList}
              >
                Remove From Study List{" "}
                <span className="badge badge-light"></span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={addToStudyList}
              >
                Add to Study List <span className="badge badge-light"></span>
              </button>
            )}
          </div>

          <div className="comments-button-and-input">
            <p>
              <a
                key={props.resource.resource_id}
                className="btn btn-info"
                data-bs-toggle="collapse"
                //data-target='#multiCollapseExample'
                href={`#collapse${props.resource.resource_id}`}
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                Show Comments
              </a>
            </p>

            <div key={props.resource.resource_id}>
              {comments.length > 0 ? (
                <div>
                  {
                    comments.map((oneComment, ix) => {
                      return (
                        <div
                          key={ix}
                          className="collapse"
                          id={`collapse${props.resource.resource_id}`}
                        >
                          <div className="card card-body">
                            {oneComment.comment_text}
                          </div>
                        </div>
                      );
                    })
                    // <input />
                  }
                </div>
              ) : (
                <div
                  className="collapse"
                  id={`collapse${props.resource.resource_id}`}
                >
                  <div className="card card-body">No Comments</div>
                </div>
              )}
            </div>
            <input
              placeholder="Add Comment"
              className="add-comment"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
            <button
              className="btn btn-light"
              onClick={() => postComment(newComment)}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
