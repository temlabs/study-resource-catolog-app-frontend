//import { ResourceProp } from "./utils/interfaces";

function ResourceCard (): JSX.Element{

  const addToStudyList

    return (
        <div className="card" >
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
    <hr></hr>
    <button type="button" className="btn btn-success">
  Likes <span className="badge badge-light">8</span>
  <span className="sr-only"></span>
</button>
<button type="button" className="btn btn-danger">
  Dislikes <span className="badge badge-light">9</span>
  <span className="sr-only"></span>
</button>
<button type="button" className="btn btn-primary" onClick = {addToStudyList}>
  Add to Study List <span className="badge badge-light"></span>
</button>
  </div> 
</div>
    );

}
export default ResourceCard;