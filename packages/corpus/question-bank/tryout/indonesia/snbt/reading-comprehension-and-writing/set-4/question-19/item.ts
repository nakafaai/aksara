import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "water-tank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (5) membantah data bulan April pada tabel.",
        },
        {
          correct: false,
          label: "Kalimat (5) menyimpulkan bahwa tandon tidak berguna.",
        },
        {
          correct: false,
          label: "Kalimat (5) memberi contoh rumah yang tidak memakai tandon.",
        },
        {
          correct: false,
          label:
            "Kalimat (5) menjelaskan penyebab turunnya pemakaian air rumah tanpa tandon.",
        },
        {
          correct: true,
          label:
            "Kalimat (5) menjelaskan penyebab naiknya pemakaian air rumah dengan tandon pada bulan April.",
        },
      ],
    },
  },
};

export default item;
