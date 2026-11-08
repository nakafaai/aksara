import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "sriwijaya-stones",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sriwijaya adalah kerajaan terbesar di Asia Tenggara karena memiliki ribuan biksu.",
        },
        {
          correct: false,
          label:
            "I-Tsing adalah orang pertama yang menemukan prasasti-prasasti Sriwijaya.",
        },
        {
          correct: false,
          label:
            "Prasasti Sriwijaya membuktikan bahwa bahasa Indonesia tidak berubah sejak abad ke-7.",
        },
        {
          correct: false,
          label:
            "Pusat Sriwijaya mungkin berada di Jambi, bukan di Palembang seperti dugaan banyak ahli.",
        },
        {
          correct: true,
          label:
            "Sejarah Sriwijaya disusun dari prasasti dan catatan musafir, yang memiliki batas.",
        },
      ],
    },
  },
};

export default item;
