import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Gewissheit.",
        },
        {
          isCorrect: false,
          label: "Aktualität.",
        },
        {
          isCorrect: true,
          label: "mangelnde Klarheit.",
        },
        {
          isCorrect: false,
          label: "Vielfalt.",
        },
        {
          isCorrect: false,
          label: "Einheitlichkeit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "certainty.",
        },
        {
          isCorrect: false,
          label: "timeliness.",
        },
        {
          isCorrect: true,
          label: "lack of clarity.",
        },
        {
          isCorrect: false,
          label: "diversity.",
        },
        {
          isCorrect: false,
          label: "uniformity.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kepastian.",
        },
        {
          isCorrect: false,
          label: "ketepatwaktuan.",
        },
        {
          isCorrect: true,
          label: "ketidakjelasan.",
        },
        {
          isCorrect: false,
          label: "keanekaragaman.",
        },
        {
          isCorrect: false,
          label: "keseragaman.",
        },
      ],
    },
  },
};

export default item;
