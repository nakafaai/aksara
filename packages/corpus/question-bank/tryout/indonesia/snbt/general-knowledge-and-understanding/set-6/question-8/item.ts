import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "abu",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Abu vulkanik aman dihirup karena berasal dari bahan alami.",
        },
        {
          column: 1,
          label:
            "Abu vulkanik di atap yang sudah terkena hujan lebih membebani atap daripada abu yang masih kering.",
        },
        {
          column: 1,
          label:
            "Abu vulkanik dapat membahayakan penerbangan walaupun pesawat terbang jauh dari gunung yang meletus.",
        },
        {
          column: 2,
          label:
            "Abu vulkanik membuat lahan di lereng gunung api tidak dapat ditanami selamanya.",
        },
      ],
    },
  },
};

export default item;
