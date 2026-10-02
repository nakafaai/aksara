import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *psychological safety* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          isCorrect: false,
          label:
            "The definition reduces *psychological safety* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          isCorrect: false,
          label:
            "The term *psychological safety* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          isCorrect: true,
          label:
            "The definition clarifies why inviting each member to voice a concern changes the group's decision process: it creates room to raise problems without humiliation.",
        },
        {
          isCorrect: false,
          label:
            "The definition is included only to name the setting and has no connection to the character's decision.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
