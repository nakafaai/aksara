import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "klar und unmittelbar ausgedrückt",
        },
        {
          isCorrect: false,
          label: "für mehr als eine Deutung offen",
        },
        {
          isCorrect: false,
          label: "durch verlässliche Belege gestützt",
        },
        {
          isCorrect: true,
          label: "alle für das Ziel wichtigen Teile berücksichtigend",
        },
        {
          isCorrect: false,
          label: "fähig, sich an veränderte Bedingungen anzupassen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "stated clearly and directly",
        },
        {
          isCorrect: false,
          label: "open to more than one interpretation",
        },
        {
          isCorrect: false,
          label: "supported by dependable evidence",
        },
        {
          isCorrect: true,
          label: "covering all parts important to the purpose",
        },
        {
          isCorrect: false,
          label: "able to adjust to changing conditions",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dinyatakan secara jelas dan langsung",
        },
        {
          isCorrect: false,
          label: "terbuka terhadap lebih dari satu penafsiran",
        },
        {
          isCorrect: false,
          label: "didukung oleh bukti yang dapat dipercaya",
        },
        {
          isCorrect: true,
          label: "mencakup seluruh bagian yang penting bagi tujuan",
        },
        {
          isCorrect: false,
          label: "mampu menyesuaikan diri dengan kondisi yang berubah",
        },
      ],
    },
  },
};

export default item;
