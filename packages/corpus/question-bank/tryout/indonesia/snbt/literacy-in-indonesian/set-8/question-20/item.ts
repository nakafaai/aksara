import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "nickel-processing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "nilai tambah dari pengolahan nikel otomatis dinikmati masyarakat luas",
        },
        {
          correct: false,
          label: "larangan ekspor bijih nikel mentah mulai berlaku pada 2020",
        },
        {
          correct: false,
          label: "smelter memerlukan listrik dalam jumlah yang sangat besar",
        },
        {
          correct: false,
          label: "negara lain tidak lagi membutuhkan nikel dari Indonesia",
        },
        {
          correct: false,
          label:
            "tambang nikel tidak memerlukan pembukaan hutan sama sekali di daerah itu",
        },
      ],
    },
  },
};

export default item;
