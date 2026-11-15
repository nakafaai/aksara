import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "temple-moss",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengaruh penggosokan dan pengaruh biosida, karena panel kelompok I juga disemprot biosida.",
        },
        {
          correct: false,
          label:
            "Pengaruh penggosokan dan pengaruh hilangnya lumut, karena kedua perlakuan itu selalu diberikan bersama.",
        },
        {
          correct: false,
          label:
            "Pengaruh sisi dinding dan pengaruh perlakuan, karena setiap kelompok ditempatkan pada sisi dinding yang berbeda.",
        },
        {
          correct: true,
          label:
            "Pengaruh biosida pada batu dan pengaruh hilangnya lumut, karena setiap panel yang disemprot biosida juga kehilangan lumutnya.",
        },
        {
          correct: false,
          label:
            "Pengaruh lumut mati dan pengaruh lumut hidup, karena lapisan lumut mati pada kelompok II langsung dibuang.",
        },
      ],
    },
  },
};

export default item;
