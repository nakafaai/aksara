import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Samira wrote the entry date on the last unmarked package; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: true,
          label:
            "Dating the final unmarked package changes the blue stamp into a cue for shared care, and the next volunteer's response shows that meaning being carried forward.",
        },
        {
          isCorrect: false,
          label:
            "Samira wrote the entry date on the last unmarked package; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Samira wrote the entry date on the last unmarked package; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Samira wrote the entry date on the last unmarked package; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
