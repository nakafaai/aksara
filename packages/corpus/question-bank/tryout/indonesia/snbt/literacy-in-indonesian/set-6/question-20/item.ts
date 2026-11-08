import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "food-estate",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "lahan yang dibuka untuk lumbung pangan cocok ditanami padi",
        },
        {
          correct: false,
          label:
            "petani kecil tidak memerlukan bantuan bibit dan harga yang adil",
        },
        {
          correct: false,
          label: "harga beras dunia tidak pernah berubah dari tahun ke tahun",
        },
        {
          correct: false,
          label: "pangan lokal lebih bergizi daripada beras bagi masyarakat",
        },
        {
          correct: false,
          label:
            "impor beras mungkin selalu lebih murah daripada menanam sendiri",
        },
      ],
    },
  },
};

export default item;
