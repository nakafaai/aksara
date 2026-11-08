import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "stingless-bees",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "lebah klanceng tidak memiliki sengat",
        },
        {
          correct: false,
          label: "lebah memindahkan serbuk sari dari satu bunga ke bunga yang lain",
        },
        {
          correct: false,
          label: "harga madu klanceng mencapai tiga kali lipat harga madu biasa",
        },
        {
          correct: false,
          label: "petani kopi mendapat madu dari kotak lebah",
        },
        {
          correct: true,
          label: "buah kopi di kebun yang dekat dengan kotak lebah lebih lebat daripada di kebun yang jauh",
        },
      ],
    },
  },
};

export default item;
