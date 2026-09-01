import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: true,
          label:
            "Rotating the recurring map and retracing the route changes it from a staff-facing reference into a passenger-facing guide, a shift confirmed when the child finds the stop.",
        },
        {
          isCorrect: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Nora turned the map upside down and traced the route from the passenger's point of view; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
