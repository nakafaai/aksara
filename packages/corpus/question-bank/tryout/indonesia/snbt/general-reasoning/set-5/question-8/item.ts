import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "helm",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ia tidak menghitung pembonceng, padahal pembonceng juga wajib memakai helm",
        },
        {
          correct: true,
          label:
            "ia menganggap pengendara di persimpangan berkamera, tempat pelanggar tahu akan ditilang, mewakili pengendara di semua jalan kota",
        },
        {
          correct: false,
          label:
            "ia membandingkan rata-rata harian Februari dan April, padahal banyak hari pada kedua bulan itu berbeda",
        },
        {
          correct: false,
          label:
            "ia menghitung persentase dari $$21{.}000$$ sepeda motor, padahal seharusnya dari $$24{.}000$$ sepeda motor",
        },
        {
          correct: false,
          label:
            "ia mengabaikan razia pada Maret yang juga dapat mengurangi pengendara tanpa helm",
        },
      ],
    },
  },
};

export default item;
