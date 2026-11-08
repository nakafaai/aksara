import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "sleep-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kalimat (5) menjelaskan alasan keadaan yang disebut pada kalimat (4).",
        },
        {
          correct: false,
          label: "Kalimat (5) memberi contoh siswa yang tidur lebih dari delapan jam.",
        },
        {
          correct: false,
          label: "Kalimat (5) menyatakan pertentangan dengan kalimat (4).",
        },
        {
          correct: false,
          label: "Kalimat (5) menyimpulkan seluruh hasil survei.",
        },
        {
          correct: false,
          label: "Kalimat (5) menyatakan akibat dari kampanye OSIS.",
        },
      ],
    },
  },
};

export default item;
