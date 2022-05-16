import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "./baseURL";
import FilterBar from "./FilterBar";
import Newresource from "./newresource";

import ResourceCard from "./ResourceCard";
import { UserProps } from "./utils/interfaces";

export default function MainComponent(props: UserProps): JSX.Element {
  // fetch tags and have a tags state string[] that can be passed into new resource and filter bar

      
import { UserProps, ContentType, Tag, ResourceProp } from "./utils/interfaces";

export default function MainComponent(props: UserProps): JSX.Element {
  const [studyListShowing, setStudyListShowing] = useState<boolean>(false);
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [studyList, setStudyList] = useState<ResourceProp[]>([]);
  const [allResourcesList, setAllResourcesList] = useState<ResourceProp[]>([]);

  // fetch the necessary data once only
  useEffect(() => {
    const getContentTypes = async () => {
      const contentTypesData: ContentType[] = await axios.get(
        `${baseUrl}/content-type`
      );
      const contentTypeNames = contentTypesData.map((ct) => ct.content_name);
      setContentTypes(contentTypeNames);
    };

    const getAllTags = async () => {
      const contentTypesData: Tag[] = await axios.get(`${baseUrl}/tags`);
      const allTagNames = contentTypesData.map((tag) => tag.tag_name);
      setAllTags(allTagNames);
    };

    const getResourceList = async () => {
      const resourceListData: ResourceProp[] = await axios.get(
        `${baseUrl}/resources`
      );
      setAllResourcesList(resourceListData);
    };

    getContentTypes();
    getAllTags();
    getResourceList();
  }, []);

  // fetch study list whenever user id is changed
  useEffect(() => {
    const getStudyList = async () => {
      if (props.user_id !== 0) {
        const studyListData: ResourceProp[] = await axios.get(
          `${baseUrl}/study-list/${props.user_id}`
        );
        setStudyList(studyListData);
      }
    };

    getStudyList();
  }, [props.user_id]);

  // RENDER CARDS FOR THE LIST BELOW
  // const listToRender = studyListShowing ? studyList : allResourcesList;

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
      />
      <ResourceCard />
    </>
  );
}
