export default function getConditionHint(condition: string) {
  switch (condition) {
    case "new":
      return "The item is brand new, unused, unopened, and in its original packaging.";
    case "like new":
      return "The item is apparently untouched and in near perfect condition.";
    case "very good":
      return "The item has been well cared for and has seen limited use, but remains in great condition.";
    case "good":
      return "The item shows wear from consistent use, but remains in good condition.";
    case "acceptable":
      return "The item is fairly worn, but works perfectly.";
  }
}
