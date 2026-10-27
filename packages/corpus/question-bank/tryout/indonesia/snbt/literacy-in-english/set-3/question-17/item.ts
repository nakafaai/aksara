import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view. The recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          correct: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view. The ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          correct: true,
          label:
            "Rotating the recurring map and retracing the route changes it from a staff-facing reference into a passenger-facing guide, a shift confirmed when the child finds the platform.",
        },
        {
          correct: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view. The setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          correct: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view. The object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
};

export default item;
