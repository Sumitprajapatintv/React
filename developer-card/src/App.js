import logo from "./logo.svg";
import "./App.css";
const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];
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
    <div className="intro">
      <h1>{props.developerName}</h1>
      <p>{props.intro}</p>
    </div>
  );
}

function SkillList(props) {
  return (
    <div className="skillList">
      {skills.map((el) => (
        <Skill
          skill={el.skill}
          color={el.color}
          level={el.level}
          key={el.skill}
        />
      ))}
    </div>
  );
}
function Skill({ skill, color, level }) {
  return (
    <div className="skill" style={{ backgroundColor: `${color}` }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
}

export default App;
