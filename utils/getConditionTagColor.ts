import Condition from "../types/condition.enum";

export default function getConditionTagColor(condition: Condition) {
  switch (condition) {
    case "new":
      return "#36BD64";
    case "like new":
      return "#11AE20";
    case "very good":
      return "#6EB811";
    case "good":
      return "#af70ee";
    case "acceptable":
      return "#955454";
  }
}
