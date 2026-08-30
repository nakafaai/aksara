import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Biskuit" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Molen" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Pia" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Sus" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Tart" }] },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "biscuit" }] },
        { isCorrect: false, label: [{ kind: "text", text: "molen" }] },
        { isCorrect: false, label: [{ kind: "text", text: "pia" }] },
        { isCorrect: true, label: [{ kind: "text", text: "sus" }] },
        { isCorrect: false, label: [{ kind: "text", text: "tart" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "biskuit" }] },
        { isCorrect: false, label: [{ kind: "text", text: "molen" }] },
        { isCorrect: false, label: [{ kind: "text", text: "pia" }] },
        { isCorrect: true, label: [{ kind: "text", text: "sus" }] },
        { isCorrect: false, label: [{ kind: "text", text: "tart" }] },
      ],
    },
  },
};

export default item;
