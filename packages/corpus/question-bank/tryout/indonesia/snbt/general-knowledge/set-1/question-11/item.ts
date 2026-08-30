import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "mangelnde Klarheit." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Gewissheit." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Aktualität." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Vielfalt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Einheitlichkeit." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "lack of clarity." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "certainty." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "timeliness." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "diversity." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "uniformity." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "ketidakjelasan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kepastian." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ketepatwaktuan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "keanekaragaman." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "keseragaman." }],
        },
      ],
    },
  },
};

export default item;
