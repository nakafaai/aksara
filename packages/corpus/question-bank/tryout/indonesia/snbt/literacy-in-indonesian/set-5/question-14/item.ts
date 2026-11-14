import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "mountain-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Banyak kasus hipotermia per seribu pendaki pada hari-hari terpadat tahun lalu tidak lebih tinggi daripada pada hari-hari sepi.",
        },
        {
          correct: false,
          label:
            "Regu penyelamat taman nasional pernah menangani $$3$$ evakuasi dalam satu hari.",
        },
        {
          correct: false,
          label:
            "Sebagian pendaki yang terkena hipotermia tahun lalu tidak membawa jaket yang memadai.",
        },
        {
          correct: false,
          label:
            "Pada hari kerja yang sepi, beberapa pendaki juga pernah tertahan lama karena kabut tebal.",
        },
        {
          correct: false,
          label:
            "Sampah yang diangkut dari Pelawangan berkurang banyak setelah kuota berlaku.",
        },
      ],
    },
  },
};

export default item;
