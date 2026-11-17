import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "support-and-movement-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Each $$\\text{cm}^3$$ of it holds $$64\\%$$ of the mass of mineral salts in each $$\\text{cm}^3$$ of normal bone, so it is softer and bends under the chicken's weight.",
        },
        {
          correct: true,
          label:
            "Each $$\\text{cm}^3$$ of it holds $$75\\%$$ of the mass of mineral salts in each $$\\text{cm}^3$$ of normal bone, so it is softer and bends under the chicken's weight.",
        },
        {
          correct: false,
          label:
            "Each $$\\text{cm}^3$$ of it holds $$75\\%$$ of the mass of mineral salts in each $$\\text{cm}^3$$ of normal bone, so it is brittle and crumbles under a small force, like piece P.",
        },
        {
          correct: false,
          label:
            "Each $$\\text{cm}^3$$ of it holds $$86\\%$$ of the mass of mineral salts in each $$\\text{cm}^3$$ of normal bone, so it is softer and bends under the chicken's weight.",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap $$\\text{cm}^3$$ tulang itu mengandungi $$64\\%$$ daripada jisim garam mineral dalam setiap $$\\text{cm}^3$$ tulang normal, jadi tulang itu lebih lembut dan membengkok di bawah berat ayam itu.",
        },
        {
          correct: true,
          label:
            "Setiap $$\\text{cm}^3$$ tulang itu mengandungi $$75\\%$$ daripada jisim garam mineral dalam setiap $$\\text{cm}^3$$ tulang normal, jadi tulang itu lebih lembut dan membengkok di bawah berat ayam itu.",
        },
        {
          correct: false,
          label:
            "Setiap $$\\text{cm}^3$$ tulang itu mengandungi $$75\\%$$ daripada jisim garam mineral dalam setiap $$\\text{cm}^3$$ tulang normal, jadi tulang itu rapuh dan hancur di bawah daya yang kecil, seperti kepingan P.",
        },
        {
          correct: false,
          label:
            "Setiap $$\\text{cm}^3$$ tulang itu mengandungi $$86\\%$$ daripada jisim garam mineral dalam setiap $$\\text{cm}^3$$ tulang normal, jadi tulang itu lebih lembut dan membengkok di bawah berat ayam itu.",
        },
      ],
    },
  },
};

export default item;
