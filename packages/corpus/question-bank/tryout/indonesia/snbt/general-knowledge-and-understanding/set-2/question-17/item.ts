import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "gerhana",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bidang orbit Bulan miring terhadap bidang orbit Bumi sehingga Bulan sering melintas di atas atau di bawah bayangan Bumi.",
        },
        {
          correct: false,
          label:
            "Bulan tidak selalu memantulkan cahaya Matahari ketika purnama.",
        },
        {
          correct: false,
          label:
            "Atmosfer Bumi menghamburkan seluruh cahaya Matahari pada sebagian besar bulan purnama sehingga bayangan Bumi tidak pernah terbentuk.",
        },
        {
          correct: false,
          label:
            "Bulan berada terlalu jauh dari Bumi pada sebagian besar bulan purnama.",
        },
        {
          correct: false,
          label:
            "Umbra Bumi hanya terbentuk pada waktu tertentu dalam setahun.",
        },
      ],
    },
  },
};

export default item;
