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
  const [displayList, setDisplayList] = useState<ResourceProp[]>([])

  // fetch the necessary data once only
  useEffect(() => {
    const getContentTypes = async () => {
      const contentTypesData = await axios.get(
        `${baseUrl}/content-type`
      );
      const contentTypeNames = (contentTypesData.data as ContentType[]).map((ct) => ct.content_name);
      setContentTypes(contentTypeNames);
    };

    const getAllTags = async () => {
      const contentTypesData = await axios.get(`${baseUrl}/tags`);
      const allTagNames = (contentTypesData.data as Tag[]).map((tag) => tag.tag_name);
      setAllTags(allTagNames);
    };

    const getResourceList = async () => {
      const resourceListData = await axios.get(
        `${baseUrl}/resources`
      );
      setAllResourcesList(resourceListData.data as ResourceProp[]);
    };

    getContentTypes();
    getAllTags();
    getResourceList();
  }, [props.user_id]);

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
  }, [props.user_id]);

  // RENDER CARDS FOR THE LIST BELOW
  useEffect(() => {
    const listToRender: ResourceProp[] = studyListShowing ? studyList : allResourcesList;

  }, [props.user_id, allResourcesList])

  return (
    <>
      <Newresource
        user_id={props.user_id}
        user_name={props.user_name}
        tags={allTags}
      />
      <FilterBar
        unfliteredResourceList={allResourcesList}
        setResourceList={setAllResourcesList}
        unfilteredStudyList={studyList}
        setStudyList={setStudyList}
        allTags={allTags}
        allContentTypes={contentTypes}
        studyListShowing={studyListShowing}
        setStudyListShowing={setStudyListShowing}
        setDisplayList={setDisplayList}
      />
      {displayList.map((resource, ix) =>
        <ResourceCard
          key={ix}
          resource={resource}
          user={props}
        />

      )}
    </>
  );
}
