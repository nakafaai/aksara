import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "cukup akurat untuk memilih benih karena berasal dari pengalaman penanam",
        },
        {
          isCorrect: false,
          label:
            "baru layak dijadikan petunjuk setelah catatan warga dikonfirmasi dengan satu uji sampel",
        },
        {
          isCorrect: false,
          label:
            "paling tepat digunakan petugas untuk mengelompokkan benih, bukan oleh peminjam",
        },
        {
          isCorrect: true,
          label:
            "berguna sebagai petunjuk, tetapi tidak menjamin hasil yang sama",
        },
        {
          isCorrect: false,
          label:
            "cukup untuk memperkirakan daya tumbuh tanpa melakukan uji sampel tambahan",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
