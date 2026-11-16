import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The average rate for the whole reaction is 0.73 cm³ s⁻¹" },
        { correct: false, label: "The rate between 60 s and 120 s is higher than in the first 60 s" },
        { correct: false, label: "The rate falls because the marble chips grow larger as they react" },
        { correct: true, label: "The average rate in the first 60 s is 1.47 cm³ s⁻¹, higher than between 60 s and 120 s because the acid concentration falls" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kadar purata bagi keseluruhan tindak balas ialah 0.73 cm³ s⁻¹" },
        { correct: false, label: "Kadar antara 60 s dan 120 s lebih tinggi daripada dalam 60 s pertama" },
        { correct: false, label: "Kadar menurun kerana ketulan marmar menjadi lebih besar semasa bertindak balas" },
        { correct: true, label: "Kadar purata dalam 60 s pertama ialah 1.47 cm³ s⁻¹, lebih tinggi daripada antara 60 s dan 120 s kerana kepekatan asid berkurang" },
      ],
    },
  },
};

export default item;
