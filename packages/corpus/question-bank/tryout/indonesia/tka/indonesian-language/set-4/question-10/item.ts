import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "change-coins",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "tersentuh karena ibu menanggapi pengakuan Nisa dengan tenang dan menghargai kejujuran pembeli",
        },
        {
          correct: false,
          label: "kecewa karena ibu tidak menghukum Nisa atas kelalaiannya",
        },
        {
          correct: false,
          label:
            "geli karena ibu menganggap kesalahan kembalian sebagai lelucon",
        },
        {
          correct: false,
          label:
            "cemas karena ibu akan menutup warung setelah mendengar cerita Nisa",
        },
        {
          correct: false,
          label:
            "marah kepada ibu karena ibu tidak menegur bapak yang terlambat mengembalikan uang",
        },
      ],
    },
  },
};

export default item;
