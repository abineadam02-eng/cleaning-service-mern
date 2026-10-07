export default function Stars({rating=5}){return <span className="stars">{'★★★★★'.slice(0,rating)}<i>{'★★★★★'.slice(0,5-rating)}</i></span>}
