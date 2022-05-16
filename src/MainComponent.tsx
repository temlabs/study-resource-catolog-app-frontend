import Newresource from "./newresource";

export interface UserProps {
  user_id: number;
  user_name: string;
}

export default function MainComponent(props: UserProps): JSX.Element {
  return (
    <>
      <Newresource user_id={props.user_id} user_name={props.user_name} />
    </>
  );
}
