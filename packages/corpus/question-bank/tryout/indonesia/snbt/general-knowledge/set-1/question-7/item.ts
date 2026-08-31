import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "das Wort *gewann* im Satz $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "das Wort *datiert* im Satz $$(4)$$.",
        },
        {
          isCorrect: true,
          label: "das Wort *Forschung* im Satz $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "das Wort *Proben* im Satz $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "das Wort *zirkulierten* im Satz $$(8)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the word *recovered* in sentence $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "the word *date* in sentence $$(4)$$.",
        },
        {
          isCorrect: true,
          label: "the word *research* in sentence $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "the word *samples* in sentence $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "the word *circulated* in sentence $$(8)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kata *menemukan* pada kalimat $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "kata *hidup* pada kalimat $$(4)$$.",
        },
        {
          isCorrect: true,
          label: "kata *penelitian* pada kalimat $$(6)$$.",
        },
        {
          isCorrect: false,
          label: "kata *sampel* pada kalimat $$(5)$$.",
        },
        {
          isCorrect: false,
          label: "kata *beredar* pada kalimat $$(8)$$.",
        },
      ],
    },
  },
};

export default item;
