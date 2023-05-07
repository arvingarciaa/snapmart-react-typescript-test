import "../styles/app.css";

interface Props{
  selectedCategoryIndex: number;
  handleCategoryChange: Function;
  categories: string[];
}

export const Sidebar = (props: Props) => {
  return (
    <div className="sidebar">
      <div className="list-group list-group-flush mt-5">
        {props.categories.map((item: string, idx: number) => {
          return (
            <button
              type="button"
              className={
                props.selectedCategoryIndex === idx 
                  ? 'list-group-item list-group-item-action active border-0' 
                  : 'list-group-item list-group-item-action border-0'
              }
              aria-current={props.selectedCategoryIndex === idx}
              onClick={() => props.handleCategoryChange(idx)}
              key={item}
             >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  );
}
