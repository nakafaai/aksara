import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "sewing-machine",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia tidak menyukai kebiasaan cucunya memotret kebaya di depan dinding putih.",
        },
        {
          correct: false,
          label:
            "Ia ingin kebaya buatannya dijual dengan harga yang lebih mahal di toko daring.",
        },
        {
          correct: true,
          label:
            "Ia menganggap mutu jahitan harus dijaga demi pemakai walau tidak tampak di foto.",
        },
        {
          correct: false,
          label:
            "Ia tersinggung karena tidak pernah diajak ikut berfoto bersama kebayanya.",
        },
        {
          correct: false,
          label:
            "Ia menolak gagasan menjual kebaya melalui toko daring milik cucunya.",
        },
      ],
    },
  },
};

export default item;
