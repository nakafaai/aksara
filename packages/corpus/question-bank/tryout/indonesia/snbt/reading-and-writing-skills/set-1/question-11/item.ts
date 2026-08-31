import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "widerstandsfähig (Satz $$(1)$$).",
        },
        {
          isCorrect: true,
          label: "verringern (Satz $$(7)$$).",
        },
        {
          isCorrect: false,
          label: "Folge (Satz $$(2)$$).",
        },
        {
          isCorrect: false,
          label: "erfüllen (Satz $$(3)$$).",
        },
        {
          isCorrect: false,
          label: "nennt (Satz $$(4)$$).",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "resilient (sentence $$(1)$$).",
        },
        {
          isCorrect: true,
          label: "reduce (sentence $$(7)$$).",
        },
        {
          isCorrect: false,
          label: "consequence (sentence $$(2)$$).",
        },
        {
          isCorrect: false,
          label: "meet (sentence $$(3)$$).",
        },
        {
          isCorrect: false,
          label: "recognizes (sentence $$(4)$$).",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "tangguh (kalimat $$(1)$$).",
        },
        {
          isCorrect: true,
          label: "memperkecil (kalimat $$(7)$$).",
        },
        {
          isCorrect: false,
          label: "akibat (kalimat $$(2)$$).",
        },
        {
          isCorrect: false,
          label: "memenuhi (kalimat $$(3)$$).",
        },
        {
          isCorrect: false,
          label: "mengakui (kalimat $$(4)$$).",
        },
      ],
    },
  },
};

export default item;
