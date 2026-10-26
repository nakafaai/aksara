import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "seed-library",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "cukup akurat untuk memilih benih karena berasal dari pengalaman penanam",
        },
        {
          correct: false,
          label:
            "baru layak dijadikan petunjuk setelah catatan warga dikonfirmasi dengan satu uji sampel",
        },
        {
          correct: false,
          label:
            "paling tepat digunakan petugas untuk mengelompokkan benih, bukan oleh peminjam",
        },
        {
          correct: true,
          label:
            "berguna sebagai petunjuk, tetapi tidak menjamin hasil yang sama",
        },
        {
          correct: false,
          label:
            "cukup untuk memperkirakan daya tumbuh tanpa melakukan uji sampel tambahan",
        },
      ],
    },
  },
};

export default item;
