import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "x = 0.56, and the solid turns from blue to white" },
        { correct: true, label: "x = 5, and the solid turns from blue to white" },
        { correct: false, label: "x = 5, and the solid turns from white to blue" },
        { correct: false, label: "x = 10, and the solid turns from blue to white" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "x = 0.56, dan pepejal bertukar daripada biru kepada putih" },
        { correct: true, label: "x = 5, dan pepejal bertukar daripada biru kepada putih" },
        { correct: false, label: "x = 5, dan pepejal bertukar daripada putih kepada biru" },
        { correct: false, label: "x = 10, dan pepejal bertukar daripada biru kepada putih" },
      ],
    },
  },
};

export default item;
