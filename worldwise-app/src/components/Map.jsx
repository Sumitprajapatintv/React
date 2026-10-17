
import { useSearchParams ,useNavigate} from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate=useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
      Position lat: {lat} long: {lng}

      <button
        onClick={() => setSearchParams({ lat: "1", lng: "2" })}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
