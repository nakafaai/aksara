import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "refill-depot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "anjuran itu meminta warga berhenti membeli air dari depot",
        },
        {
          correct: false,
          label: "anjuran itu tidak berhubungan dengan temuan petugas",
        },
        {
          correct: true,
          label:
            "anjuran memperhatikan pencucian galon menanggapi temuan bahwa depot yang gagal tidak mencuci galon pembeli",
        },
        {
          correct: false,
          label: "anjuran itu dibuat karena harga air depot naik",
        },
        {
          correct: false,
          label: "anjuran itu meminta warga mengganti saringan depot sendiri",
        },
      ],
    },
  },
};

export default item;
