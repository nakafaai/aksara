import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "antibiotic-resistance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bakteri yang tidak berbahaya dapat berubah menjadi virus.",
        },
        {
          correct: false,
          label: "Bakteri yang tidak berbahaya membuat antibiotik cepat rusak.",
        },
        {
          correct: true,
          label:
            "Gen kekebalannya dapat berpindah ke bakteri penyebab penyakit berat.",
        },
        {
          correct: false,
          label:
            "Bakteri yang tidak berbahaya berkembang biak lebih cepat daripada bakteri lain.",
        },
        {
          correct: false,
          label:
            "Bakteri yang tidak berbahaya menghasilkan racun ketika diberi antibiotik.",
        },
      ],
    },
  },
};

export default item;
