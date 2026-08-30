import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "WWF" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "WFW" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "WFF" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "FWW" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "FWF" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "TTF" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "TFT" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "TFF" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "FTT" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "FTF" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "BBS" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "BSB" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "BSS" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "SBB" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "SBS" }],
        },
      ],
    },
  },
};

export default item;
