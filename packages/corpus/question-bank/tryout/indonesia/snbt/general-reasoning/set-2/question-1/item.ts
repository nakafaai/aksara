import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "pesepeda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Risiko kecelakaan per perjalanan di persimpangan naik lebih dari $$20\\%$$, sedangkan di ruas jalan turun lebih dari $$75\\%$$.",
        },
        {
          correct: false,
          label:
            "Risiko kecelakaan per perjalanan pada 2025 turun, baik di ruas jalan maupun di persimpangan, karena total kecelakaan naik lebih lambat daripada jumlah perjalanan.",
        },
        {
          correct: false,
          label:
            "Pembatas beton menurunkan risiko kecelakaan per perjalanan di ruas jalan menjadi seperlima risiko pada 2024.",
        },
        {
          correct: false,
          label:
            "Kecelakaan di persimpangan pada 2025 sama banyaknya dengan perkiraan yang dihitung dari risiko per perjalanan 2024 dan jumlah perjalanan 2025.",
        },
        {
          correct: true,
          label:
            "Jika risiko per perjalanan 2024 tetap berlaku pada 2025, ruas jalan akan mencatat jauh lebih banyak kecelakaan daripada yang terjadi, sedangkan persimpangan akan mencatat lebih sedikit.",
        },
      ],
    },
  },
};

export default item;
