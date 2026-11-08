import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "lichen-air",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Simpulan itu lemah karena jenis lumut kerak jingga tertentu justru tumbuh subur di tempat yang kaya senyawa nitrogen, seperti sekitar peternakan.",
        },
        {
          correct: false,
          label:
            "Simpulan itu tepat karena lumut kerak hanya dapat hidup di udara yang bersih.",
        },
        {
          correct: false,
          label:
            "Simpulan itu tepat karena lumut kerak berwarna jingga termasuk jenis yang paling peka.",
        },
        {
          correct: false,
          label:
            "Simpulan itu lemah karena lumut kerak tidak dapat tumbuh di sekitar peternakan.",
        },
        {
          correct: false,
          label:
            "Simpulan itu lemah karena pengamatan seharusnya dilakukan pada musim hujan.",
        },
      ],
    },
  },
};

export default item;
