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
          label: "Ia tidak menyukai kebiasaan cucunya memotret kebaya.",
        },
        {
          correct: false,
          label:
            "Ia ingin kebaya buatannya dijual dengan harga yang lebih mahal.",
        },
        {
          correct: true,
          label:
            "Ia menganggap mutu jahitan harus dijaga demi pemakainya, meskipun bagian itu tidak terlihat dalam foto.",
        },
        {
          correct: false,
          label: "Ia tersinggung karena tidak pernah diajak ikut berfoto.",
        },
        {
          correct: false,
          label: "Ia menolak gagasan menjual kebaya melalui toko daring.",
        },
      ],
    },
  },
};

export default item;
