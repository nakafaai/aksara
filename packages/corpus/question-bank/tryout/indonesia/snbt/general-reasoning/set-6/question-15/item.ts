import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Biskuit" },
        { isCorrect: false, label: "Molen" },
        { isCorrect: false, label: "Pia" },
        { isCorrect: true, label: "Sus" },
        { isCorrect: false, label: "Tart" },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "biscuit" },
        { isCorrect: false, label: "molen" },
        { isCorrect: false, label: "pia" },
        { isCorrect: true, label: "sus" },
        { isCorrect: false, label: "tart" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "biskuit" },
        { isCorrect: false, label: "molen" },
        { isCorrect: false, label: "pia" },
        { isCorrect: true, label: "sus" },
        { isCorrect: false, label: "tart" },
      ],
    },
  },
};

export default item;
