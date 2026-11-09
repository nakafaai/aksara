import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "wrong-hem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bu Lastri tidak menyalahkan Tika dan menanggung kesalahan itu dengan ringan",
        },
        {
          correct: false,
          label: "Bu Lastri meminta Tika membelikannya kacamata baru",
        },
        {
          correct: false,
          label: "Bu Lastri marah karena tulisan Tika sulit dibaca",
        },
        {
          correct: false,
          label: "Bu Lastri menolak memperbaiki celana yang kepanjangan",
        },
        {
          correct: false,
          label: "Bu Lastri sedang sakit mata sehingga tidak bisa menjahit",
        },
      ],
    },
  },
};

export default item;
