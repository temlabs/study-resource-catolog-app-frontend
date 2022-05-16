/**
 * assumes both an unfiltered resource list and an unfiltered study list are being passed in.
 * these are of type ResourceProp below
 *
 * assumes that the setters for both of these are passed in and that they take a single element of type ResourceProp below
 *
 * assumes a string array of all possible tags is passed in
 *
 * assumes a string array of all possible content types is passed in
 *
 *
 */

import React, { useState } from "react";
import Tag from "./Tag";
import { FilterBarProps, ResourceProp } from "./utils/interfaces";

export default function FilterBar({
    unfliteredResourceList,
    setResourceList,
    unfilteredStudyList,
    setStudyList,
    allTags,
    allContentTypes,
    studyListShowing,
    setStudyListShowing,
    setDisplayList

}: FilterBarProps): JSX.Element {
    const [searchInputText, setSearchInputText] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedContentType, setSelectedContentType] = useState<string>("");

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


    function setContentTypeAndFilter(newSelectedContentType: string) {
        // filter according to the content type
        setSelectedContentType(newSelectedContentType);
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
            searchInputText.length > 0 ? searchTextRegex.test(resourceName) : true;
        // default behaviour is that resources with at least one of the selected tags will show
        // if you want it so that only resources with ALL the selected tags show,
        // replace some with every
        const meetsTagsCriteria = (resourceTags: string[]) =>
            selectedTags.length > 0
                ? selectedTags.some((tag) => resourceTags.includes(tag))
                : true;

        const meetsContentTypeCriteria = (contentType: string) =>
            selectedContentType.length > 0
                ? contentType === selectedContentType
                : true;

        const filteredList = list.filter(
            (r) =>
                meetsSearchTextCriteria(r.resource_name) &&
                meetsTagsCriteria(r.tags ? r.tags.split(",") : []) &&
                meetsContentTypeCriteria(r.content_name)
        );
        setListTo(filteredList);
        setDisplayList(filteredList)
    }

    return (
        <section className="flex-column">
            <div id="filters" className="flex-row">
                {/* The search bar */}
                <input
                    value={searchInputText}
                    onChange={(e) => setSearchInputTextAndFilter(e)}
                    type="text"
                    className="form-control"
                    placeholder="Search for a resource"
                    aria-label="Search for a resource"
                    aria-describedby="basic-addon1"
                />

                {/* The select drop down to filter on content type */}
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {selectedContentType.length > 0
                            ? selectedContentType
                            : "Select a content type"}
                    </button>
                    <ul
                        className="dropdown-menu btn btn-info"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        {allContentTypes.map((ct) => {
                            return (
                                <li
                                    className="dropdown-item"
                                    onClick={() => setContentTypeAndFilter(ct)}
                                    key={ct}
                                >
                                    {ct}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Study list toggle */}
                <div className="form-check form-switch">
                    <input
                        onChange={() => setStudyListShowing(!studyListShowing)}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        Show study list
                    </label>
                </div>
            </div>

            <div id="tag-cloud" className="flex-row">
                {allTags.map((t, i) => (
                    <Tag key={i} name={t} addOrRemoveTag={addOrRemoveTag} />
                ))}
            </div>
        </section>
    );
}
