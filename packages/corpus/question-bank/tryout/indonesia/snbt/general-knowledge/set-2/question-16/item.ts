import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "seine Gestalt war schlanker geworden.",
        },
        {
          isCorrect: false,
          label: "lang und zerzaust.",
        },
        {
          isCorrect: false,
          label: "seine Wangen waren rau.",
        },
        {
          isCorrect: false,
          label: "dunkle Ringe.",
        },
        {
          isCorrect: false,
          label: "sich rasieren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "his frame had grown leaner.",
        },
        {
          isCorrect: false,
          label: "long and messy.",
        },
        {
          isCorrect: false,
          label: "his cheeks were rough.",
        },
        {
          isCorrect: false,
          label: "dark circles.",
        },
        {
          isCorrect: false,
          label: "shaving.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "tubuhnya tampak makin ramping.",
        },
        {
          isCorrect: false,
          label: "gondrong berantakan.",
        },
        {
          isCorrect: false,
          label: "pipinya kasar.",
        },
        {
          isCorrect: false,
          label: "lingkaran hitam.",
        },
        {
          isCorrect: false,
          label: "bercukur.",
        },
      ],
    },
  },
};

export default item;
