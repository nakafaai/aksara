import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$5\\text{ m und }5\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$5\\text{ m und }6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$4\\text{ m und }6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\text{ m und }4\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ m und }2\\text{ m}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$5\\text{ Meters and }5\\text{ Meters}$$" },
        {
          isCorrect: false,
          label: "$$5\\text{ Meters and }6\\text{ Meters}$$",
        },
        {
          isCorrect: false,
          label: "$$4\\text{ Meters and }6\\text{ Meters}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\text{ Meters and }4\\text{ Meters}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ Meters and }2\\text{ Meters}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$5\\text{ Meter dan }5\\text{ Meter}$$" },
        { isCorrect: false, label: "$$5\\text{ Meter dan }6\\text{ Meter}$$" },
        { isCorrect: false, label: "$$4\\text{ Meter dan }6\\text{ Meter}$$" },
        { isCorrect: false, label: "$$6\\text{ Meter dan }4\\text{ Meter}$$" },
        { isCorrect: false, label: "$$8\\text{ Meter dan }2\\text{ Meter}$$" },
      ],
    },
  },
};

export default item;
