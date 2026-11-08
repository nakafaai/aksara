import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "noken",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menggantikan seluruh tas plastik di Indonesia dengan noken",
        },
        {
          correct: false,
          label: "menaikkan harga jual noken di pasar-pasar di Papua",
        },
        {
          correct: false,
          label: "mendaftarkan noken sebagai warisan budaya ke UNESCO",
        },
        {
          correct: false,
          label: "mengajarkan cara menggendong bayi dengan noken yang benar",
        },
        {
          correct: true,
          label: "mewariskan keterampilan membuat noken kepada generasi muda",
        },
      ],
    },
  },
};

export default item;
