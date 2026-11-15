import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "tone-attitude",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "marah, karena ayah memaksa keluarganya hidup mengikuti laut",
        },
        {
          correct: true,
          label:
            "rindu yang tenang, disertai kesadaran yang perlahan tumbuh tentang kebijaksanaan ayah",
        },
        {
          correct: false,
          label:
            "duka yang mendalam, karena ayah sudah meninggal dan tidak dapat lagi melaut",
        },
        {
          correct: false,
          label:
            "mengejek, karena ayah masih percaya pada tanda-tanda alam di zaman ponsel",
        },
        {
          correct: false,
          label:
            "gembira tanpa beban, karena aku sudah bebas dari jadwal pasang di kota",
        },
      ],
    },
  },
};

export default item;
