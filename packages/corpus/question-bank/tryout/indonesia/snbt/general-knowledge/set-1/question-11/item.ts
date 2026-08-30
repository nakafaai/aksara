import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "mangelnde Klarheit.",
        },
        {
          isCorrect: false,
          label: "Gewissheit.",
        },
        {
          isCorrect: false,
          label: "Aktualität.",
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
          isCorrect: true,
          label: "lack of clarity.",
        },
        {
          isCorrect: false,
          label: "certainty.",
        },
        {
          isCorrect: false,
          label: "timeliness.",
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
          isCorrect: true,
          label: "ketidakjelasan.",
        },
        {
          isCorrect: false,
          label: "kepastian.",
        },
        {
          isCorrect: false,
          label: "ketepatwaktuan.",
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
