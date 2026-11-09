import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "text-structure",
  },
  stimulus: "silted-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "keadaan dulu, masalah beserta penyebab dan akibatnya, upaya warga, lalu hasilnya",
        },
        {
          correct: false,
          label: "hasil, lalu penyebab hasil itu",
        },
        {
          correct: false,
          label: "pendapat, alasan, lalu contoh",
        },
        {
          correct: false,
          label: "upaya warga, lalu keadaan dulu",
        },
        {
          correct: false,
          label: "perbandingan dua embung",
        },
      ],
    },
  },
};

export default item;
