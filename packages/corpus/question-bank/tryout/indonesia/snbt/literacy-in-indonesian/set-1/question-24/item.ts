import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "P ditulis sebelum 1947, karena *Soekarno* masih memakai *oe*, sedangkan Q ditulis pada 1972 atau sesudahnya.",
        },
        {
          correct: false,
          label:
            "P ditulis antara 1947 dan 1972, karena *membatja* masih memakai *tj*, sedangkan Q ditulis pada 1972 atau sesudahnya.",
        },
        {
          correct: true,
          label:
            "P ditulis sebelum 1972, entah sebelum atau sesudah 1947, sedangkan Q ditulis pada 1972 atau sesudahnya.",
        },
        {
          correct: false,
          label:
            "P ditulis sebelum 1972, sedangkan Q tidak mungkin dokumen resmi, karena mencampur *oe* dari ejaan lama dengan *c* dari EYD.",
        },
        {
          correct: false,
          label:
            "P dan Q dapat ditulis pada tahun yang sama, karena perbedaan *tj* dan *c* hanya soal kebiasaan penulisnya.",
        },
      ],
    },
  },
};

export default item;
