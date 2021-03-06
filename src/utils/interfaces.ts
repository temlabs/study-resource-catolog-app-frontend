export interface UserProps {
  user_id: number;
  user_name: string;
}

export interface NewResourceProps extends UserProps {
  tags: string[];
  userLoggedIn: boolean;
  contentTypes: string[];
  newPost: boolean;
  setNewPost: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ResourceProp {
  resource_id: number;
  user_id: number;
  user_name: string;
  is_faculty: boolean;
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  post_date: string;
  tags: string;
  content_name: string;
  build_stage: string;
  recommendation_nature: string;
  recommendation_reason: string;
  net_reaction: number;
  upvote_reaction: number;
  downvote_reaction: number;
}

export interface ResourcePost {
  user_id: number;
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  tags: string[];
  content_name: string;
  build_stage: string;
  recommendation_nature: string;
  recommendation_reason: string;
}

export interface FilterBarProps {
  userLoggedIn: boolean;
  unfilteredResourceList: ResourceProp[];
  unfilteredStudyList: ResourceProp[];
  // setResourceList: (list: ResourceProp[]) => void;
  // setStudyList: (list: ResourceProp[]) => void;
  allTags: string[];
  allContentTypes: string[];
  studyListShowing: boolean;
  setStudyListShowing: (studyListOn: boolean) => void;
  setDisplayList: (list: ResourceProp[]) => void;
}

export interface ContentType {
  content_id: number;
  content_name: string;
}

export interface Tag {
  tag_id: number;
  tag_name: string;
}
