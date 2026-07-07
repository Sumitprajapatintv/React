// import Map from "../components/Map";
// import Sidebar from "../components/Sidebar";
// import User from "../components/User";

import Logo from "../components/Logo";
import Sidebar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <Map/>
    </div>
  );
}

export default AppLayout;