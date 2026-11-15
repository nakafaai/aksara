import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sebelum 1958, Piala Thomas belum pernah dimenangi negara selain Malaya.",
        },
        {
          column: 1,
          label:
            "Indonesia memenangi Piala Thomas pada keikutsertaannya yang pertama.",
        },
        {
          column: 2,
          label:
            "Para pemain regu 1958 baru mulai berlatih bulu tangkis setelah PBSI berdiri.",
        },
        {
          column: 1,
          label:
            "Indonesia memenangi Piala Thomas pada tiga kejuaraan berturut-turut, dari 1958 sampai 1964.",
        },
      ],
    },
  },
};

export default item;
