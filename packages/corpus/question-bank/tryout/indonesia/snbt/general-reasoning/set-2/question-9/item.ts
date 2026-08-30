import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng no!miaw mee!ow" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "no!miaw eng mee!ow" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng n mee!ow o!miaw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "no!miawi mee!ow eng" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "mee!ow no!miawi eng" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng no!miaw mee!ow" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "no!miaw eng mee!ow" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng n mee!ow o!miaw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "no!miawi mee!ow eng" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "mee!ow no!miawi eng" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng no!miaw mee!ow" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "no!miaw eng mee!ow" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng n mee!ow o!miaw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "no!miawi mee!ow eng" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "mee!ow no!miawi eng" }],
        },
      ],
    },
  },
};

export default item;
