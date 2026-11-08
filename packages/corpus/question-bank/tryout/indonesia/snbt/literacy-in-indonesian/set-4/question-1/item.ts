import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "antibiotic-resistance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Antibiotik mengubah bakteri yang peka menjadi bakteri yang kebal.",
        },
        {
          correct: true,
          label:
            "Bakteri peka mati sehingga bakteri tahan berkembang biak tanpa banyak pesaing.",
        },
        {
          correct: false,
          label:
            "Bakteri belajar melawan antibiotik setelah beberapa kali terpapar obat yang sama.",
        },
        {
          correct: false,
          label:
            "Antibiotik merangsang tubuh menghasilkan lebih banyak bakteri baru.",
        },
        {
          correct: false,
          label:
            "Bakteri yang kebal memakan bakteri yang mati karena antibiotik.",
        },
      ],
    },
  },
};

export default item;
