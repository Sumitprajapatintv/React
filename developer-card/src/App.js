import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="card">
      <Avatar imageName="developer/sumit.jpg" />
      <div className="data">
        <Intro
          developerName="Sumit Prajapti"
          intro=" A passionate software developer with 1 of experience in crafting robust
        and scalable applications."
        />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return <img src={props.imageName} alt="Sumit" />;
}

function Intro(props) {
  return (
    <div class="intro">
      <h1>{props.developerName}</h1>
      <p>{props.intro}</p>
    </div>
  );
}

function SkillList(props) {
  return (
    <div className="skillList">
      <Skill skillName="React" emoji="💪" color="red" />
      <Skill skillName="JavaScript" emoji="☝️" color="blue" />
      <Skill skillName="Nodejs" emoji="👍" color="yellow" />
      <Skill skillName="Express" emoji="✊" color="grey" />
      <Skill skillName="MongoDb" emoji="✊" color="green" />
    </div>
  );
}
function Skill(props) {
  return (
    <div class="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skillName}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

export default App;
