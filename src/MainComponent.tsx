import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "./baseURL";
import FilterBar from "./FilterBar";
import Newresource from "./newresource";
import { UserProps, ContentType, Tag, ResourceProp } from "./utils/interfaces";
import ResourceCard from "./ResourceCard";

export default function MainComponent(props: UserProps): JSX.Element {
  const [studyListShowing, setStudyListShowing] = useState<boolean>(false);
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [studyList, setStudyList] = useState<ResourceProp[]>([]);
  const [allResourcesList, setAllResourcesList] = useState<ResourceProp[]>([]);
  const [displayList, setDisplayList] = useState<ResourceProp[]>([]);
  const [likeTrigger, setLikeTrigger] = useState<boolean>(false)
  const [studyListTrigger, setStudyListTrigger] = useState<boolean>(false)

  // fetch the necessary data once only
  useEffect(() => {
    const getContentTypes = async () => {
      const contentTypesData = await axios.get(`${baseUrl}/content-type`);
      const contentTypeNames = (contentTypesData.data as ContentType[]).map(
        (ct) => ct.content_name
      );
      setContentTypes(contentTypeNames);
    };

    const getAllTags = async () => {
      const contentTypesData = await axios.get(`${baseUrl}/tags`);
      const allTagNames = (contentTypesData.data as Tag[]).map(
        (tag) => tag.tag_name
      );
      setAllTags(allTagNames);
    };

    const getResourceList = async () => {
      const resourceListData = await axios.get(`${baseUrl}/resources`);
      setAllResourcesList(resourceListData.data as ResourceProp[]);
      setDisplayList(resourceListData.data as ResourceProp[]);
    };

    getContentTypes();
    getAllTags();
    getResourceList();
  }, [props.user_id, likeTrigger]);

  // fetch study list whenever user id is changed
  useEffect(() => {
    const getStudyList = async () => {
      if (props.user_id !== 0) {
        const studyListData = await axios.get(
          `${baseUrl}/study-list/${props.user_id}`
        );
        setStudyList(studyListData.data as ResourceProp[]);
      }
    };

    getStudyList();
  }, [props.user_id, studyListTrigger]);

  

  return (
    <>
      <Newresource
        user_id={props.user_id}
        user_name={props.user_name}
        tags={allTags}
      />
      <FilterBar
        userLoggedIn={props.user_id === 0 ? false : true}
        unfilteredResourceList={allResourcesList}
        // setResourceList={setAllResourcesList}
        unfilteredStudyList={studyList}
        allTags={allTags}
        allContentTypes={contentTypes}
        studyListShowing={studyListShowing}
        setStudyListShowing={setStudyListShowing}
        setDisplayList={setDisplayList}
      />
      <p>
        {`${displayList.length} results of ${
          studyListShowing ? studyList.length : allResourcesList.length
        }`}
      </p>
      {displayList.map((resource, ix) => (
        <div key={ix} >
        <ResourceCard key={ix} resource={resource} user={props}
          likeTrigger={likeTrigger}
          setLikeTrigger={setLikeTrigger}
          studyListTrigger={studyListTrigger}
          setStudyListTrigger={setStudyListTrigger}
        />
        </div>
      ))}
    </>
  );
}
