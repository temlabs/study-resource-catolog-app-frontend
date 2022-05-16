interface TagProps {
  name: string;
  addOrRemoveTag: (name: string, tagElement: HTMLElement) => void;
}

export default function Tag({ name, addOrRemoveTag }: TagProps): JSX.Element {
  return (
    <button
      onClick={(e) => addOrRemoveTag(name, e.target as HTMLElement)}
      className="btn btn-primary btn-sm tag unselected"
      type="submit"
    >
      {name}
    </button>
  );
}
