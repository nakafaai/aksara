import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
        {
          isCorrect: true,
          label:
            "Putting both greetings on the recurring card preserves their different contexts instead of declaring one wrong, which gives the ending its reconciliatory force.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
