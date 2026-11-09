import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "rumput",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "jenis rumput laut yang hanya tumbuh di perairan jernih",
        },
        {
          correct: false,
          label: "penyakit yang membuat rumput laut memutih dan rontok",
        },
        {
          correct: false,
          label: "tali panjang tempat potongan rumput laut diikat",
        },
        {
          correct: true,
          label: "bahan pengental hasil olahan rumput laut kering",
        },
        {
          correct: false,
          label: "pengepul yang membeli hasil panen dari petani",
        },
      ],
    },
  },
};

export default item;
