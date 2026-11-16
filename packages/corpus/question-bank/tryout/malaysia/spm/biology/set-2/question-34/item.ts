import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Man P" },
        { correct: true, label: "Man Q" },
        { correct: false, label: "Man R" },
        { correct: false, label: "None of them, because the child shares a band with each man" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Lelaki P" },
        { correct: true, label: "Lelaki Q" },
        { correct: false, label: "Lelaki R" },
        { correct: false, label: "Tiada seorang pun, kerana anak berkongsi satu jalur dengan setiap lelaki" },
      ],
    },
  },
};

export default item;
