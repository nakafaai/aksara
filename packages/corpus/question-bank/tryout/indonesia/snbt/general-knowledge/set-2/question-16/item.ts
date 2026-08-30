import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "lang und zerzaust." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "seine Wangen waren rau." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "dunkle Ringe." }],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "seine Gestalt war schlanker geworden." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sich rasieren." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "long and messy." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "his cheeks were rough." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "dark circles." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "his frame had grown leaner." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "shaving." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "gondrong berantakan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pipinya kasar." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "lingkaran hitam." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "tubuhnya tampak makin ramping." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "bercukur." }],
        },
      ],
    },
  },
};

export default item;
