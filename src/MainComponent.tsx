import FilterBar from "./FilterBar";
import Newresource from "./newresource";
import ResourceCard from "./ResourceCard";
import { UserProps } from "./utils/interfaces";

export default function MainComponent(props: UserProps): JSX.Element {
  // fetch tags and have a tags state string[] that can be passed into new resource and filter bar

  return (
    <>
      {/* <Newresource user_id={props.user_id} user_name={props.user_name} tags={ } />
      <FilterBar
        unfliteredResourceList={ }
        setResourceList={ }
        unfilteredStudyList={ }
        setStudyList={ }
        allTags={ }
        allContentTypes={ }
      /> */}
      <ResourceCard />
    </>
  );
}
