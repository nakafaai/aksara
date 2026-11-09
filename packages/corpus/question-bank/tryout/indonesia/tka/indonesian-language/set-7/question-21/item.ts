import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "sachet-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "saset terbuat dari kertas yang mudah terurai di tanah",
        },
        {
          correct: true,
          label:
            "saset terasa hemat bagi pembeli, tetapi menyulitkan pengelolaan sampah karena hampir tidak bisa didaur ulang",
        },
        {
          correct: false,
          label: "harga kopi saset lebih murah daripada harga kopi curah",
        },
        {
          correct: false,
          label: "warung hanya menjual kopi dalam kemasan saset",
        },
        {
          correct: false,
          label: "pengelola sampah melarang warung menjual saset",
        },
      ],
    },
  },
};

export default item;
