import axios from "axios";
import { ResourceProp, UserProps } from "./utils/interfaces";
import { baseUrl } from "./baseURL";
import {useEffect, useState} from "react"
import { StringLiteralLike } from "typescript";
import { resourceUsage } from "process";

interface ResourceCardProps {
  resource: ResourceProp;
  user: UserProps;
  likeTrigger: boolean;
  setLikeTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  studyListTrigger: boolean;
  setStudyListTrigger: React.Dispatch<React.SetStateAction<boolean>>
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
  const [comments, setComments] = useState<CommentsProps[]>([])
  const [commentsTrigger, setCommentsTrigger] = useState<boolean>(false)
  const [newComment, setNewComment] = useState<string>('')
  const addToStudyList = () => {
    axios.post(`${baseUrl}/studylist`, {
      user_id: props.user.user_id,
      resource_id: props.resource.resource_id,
    })
    props.setStudyListTrigger(!props.studyListTrigger);
  };
  const addLike = () => {
    axios.post(`${baseUrl}/reaction`, {
      resource_id: props.resource.resource_id,
      user_id: props.user.user_id,
      polarity: 1,
    })
    props.setLikeTrigger(!props.likeTrigger);
  };
  const addDislike = () => {
    axios.post(`${baseUrl}/reaction`, {
      resource_id: props.resource.resource_id,
      user_id: props.user.user_id,
      polarity: -1,
    })
    props.setLikeTrigger(!props.likeTrigger);
  };

  useEffect(()=> {
    try {
      const getComments = async () => {
        if(props.resource.resource_id !== 0){
          const commentsData = await axios.get(`${baseUrl}/comments/${props.resource.resource_id}`)
          setComments(commentsData.data)
          getComments()
        }
      }
      
    } catch (error) {
      console.error(error)
    }
  }, [commentsTrigger])

  const postComment = (comment:string) => {
    axios.post(`${baseUrl}/comments`,{
      resource_id : props.resource.resource_id,
      comment_text: comment,
      user_id: props.user.user_id
    })
    setCommentsTrigger(!commentsTrigger)
    setNewComment("")
  }


  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.resource.resource_name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {props.resource.author_name}
        </h6>

        <a href={props.resource.url} className="card-link">
          {props.resource.url}
        </a>
        <p className="card-text"> {props.resource.description}</p>
        <p className="card-text"> {props.resource.recommendation_reason}</p>
        <p className="card-text"> {props.resource.recommendation_nature}</p>
        <span className="btn btn-info">
          {props.resource.content_name}
        </span>
        {props.resource.tags
          ? props.resource.tags.split(",").map((tag, ix) => (
              <span key={ix} className="btn btn-primary">
                {tag}
              </span>
            ))
          : "No tags"}
        <span className="btn btn-warning">
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
        
          <p>
          <a key ={props.resource.resource_id} className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Show Comments
          </a>
          
        </p>
        <div key={props.resource.resource_id}>
          {comments.length > 0
          ? 
          <div>
          {comments.map((oneComment, ix) => {return(
            
            <div key={ix} className="collapse" id="collapseExample">
            <div className="card card-body">
              {oneComment.comment_text} 
            </div>
          </div>
          )})
          // <input />
          }
          </div>
          :
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            No Comments
          </div>
        </div>
        }
        </div>
        <input
        
        placeholder="Add Comment"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
        />
        <button onClick={() => postComment(newComment)}>
          submit
        </button>
    </div>
    </div>

  );
}

export default ResourceCard;
