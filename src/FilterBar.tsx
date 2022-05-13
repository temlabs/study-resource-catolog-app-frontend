import React, { useState } from "react";
import Tag from "./Tag";

interface ResourceProp {
  resource_id: number;
  user_id: number;
  user_name: string;
  is_faculty: boolean;
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  post_date: string;
  tags: string[];
  content_name: string;
  build_stage: string;
  recommendation_nature: string;
  recommendation_reason: string;
  net_reaction: number;
  upvote_reaction: number;
  downvote_reaction: number;
}

interface FilterBarProps {
  unfliteredResourceList: ResourceProp[];
  setResourceList: (list: ResourceProp[]) => void;
  unfilteredStudyList: ResourceProp[];
  setStudyList: (list: ResourceProp[]) => void;
  allTags: string[];
}

export default function FilterBar({
  unfliteredResourceList,
  setResourceList,
  unfilteredStudyList,
  setStudyList,
  allTags,
}: FilterBarProps): JSX.Element {
  const [searchInputText, setSearchInputText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function addOrRemoveTag(tagName: string, tagElement: HTMLElement) {
    const isSelected: boolean = selectedTags.includes(tagName);
    if (isSelected) {
      const newSelectedTags = selectedTags.filter((t) => t !== tagName); // remove the tag from the selected list
      tagElement.classList.add("unselected");
      setSelectedTags(newSelectedTags);
    } else {
      // add it to the selected list
      const newSelectedTags: string[] = [...selectedTags];
      newSelectedTags.push(tagName);
      tagElement.classList.remove("unselected");
      setSelectedTags(newSelectedTags);
    }
    filterListOfResources(unfliteredResourceList, setResourceList);
    filterListOfResources(unfilteredStudyList, setStudyList);
  }

  function setSearchInputTextAndFilter(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSearchInputText(e.target.value);
    filterListOfResources(unfliteredResourceList, setResourceList);
    filterListOfResources(unfilteredStudyList, setStudyList);
  }

  function filterListOfResources(
    list: ResourceProp[],
    setListTo: (list: ResourceProp[]) => void
  ) {
    const searchTextRegex = new RegExp(searchInputText);
    // predicate functions
    const meetsSearchTextCriteria = (resourceName: string) =>
      searchTextRegex.test(resourceName);
    // default behaviour is that resources with at least one of the selected tags will show
    // if you want it so that only resources with ALL the selected tags show,
    // replace some with every
    const meetsTagsCriteria = (resourceTags: string[]) =>
      selectedTags.some((tag) => resourceTags.includes(tag));

    const filteredList = list.filter(
      (r) =>
        meetsSearchTextCriteria(r.resource_name) && meetsTagsCriteria(r.tags)
    );
    setListTo(filteredList);
  }

  return (
    <section className="flex-column">
      <div id="filters" className="flex-row">
        <input
          value={searchInputText}
          onChange={(e) => setSearchInputTextAndFilter(e)}
          type="text"
          className="form-control"
          placeholder="Search for a resource"
          aria-label="Search for a resource"
          aria-describedby="basic-addon1"
        />
      </div>
      <div id="tag-cloud" className="flex-row">
        {allTags.map((t, i) => (
          <Tag key={i} name={t} addOrRemoveTag={addOrRemoveTag} />
        ))}
      </div>
    </section>
  );
}
