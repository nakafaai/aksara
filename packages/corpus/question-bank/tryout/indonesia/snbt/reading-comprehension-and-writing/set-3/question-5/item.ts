import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "salt-house",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "garam mereka menjadi lebih putih karena tercuci air hujan",
        },
        {
          correct: true,
          label: "garam yang belum dipanen larut kembali sehingga mereka bisa gagal panen",
        },
        {
          correct: false,
          label: "air laut di petak mereka menguap lebih cepat daripada biasanya",
        },
        {
          correct: false,
          label: "biaya membangun petak tanah mereka menjadi lebih besar",
        },
        {
          correct: false,
          label: "hasil panen mereka naik hampir dua kali lipat",
        },
      ],
    },
  },
};

export default item;
