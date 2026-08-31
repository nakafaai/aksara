import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "WWF",
        },
        {
          isCorrect: true,
          label: "WFW",
        },
        {
          isCorrect: false,
          label: "WFF",
        },
        {
          isCorrect: false,
          label: "FWW",
        },
        {
          isCorrect: false,
          label: "FWF",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "TTF",
        },
        {
          isCorrect: true,
          label: "TFT",
        },
        {
          isCorrect: false,
          label: "TFF",
        },
        {
          isCorrect: false,
          label: "FTT",
        },
        {
          isCorrect: false,
          label: "FTF",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "BBS",
        },
        {
          isCorrect: true,
          label: "BSB",
        },
        {
          isCorrect: false,
          label: "BSS",
        },
        {
          isCorrect: false,
          label: "SBB",
        },
        {
          isCorrect: false,
          label: "SBS",
        },
      ],
    },
  },
};

export default item;
