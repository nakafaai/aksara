import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "kedelai",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pergiliran jagung dan kedelai ikut menekan hama yang dapat hidup, baik pada jagung maupun pada kedelai.",
        },
        {
          column: 1,
          label:
            "Kedelai dapat membuat lahan kehilangan nitrogen walaupun bakteri di bintil akarnya tetap menambat nitrogen dari udara.",
        },
        {
          column: 1,
          label:
            "Memupuk lahan dengan urea secara berlebihan sebelum kedelai ditanam dapat membuat petani justru memperoleh lebih sedikit nitrogen dari kedelai.",
        },
        {
          column: 2,
          label:
            "Sebagian besar nitrogen yang dikumpulkan tanaman kedelai kembali ke tanah melalui akar, batang, dan daun yang dibenamkan.",
        },
      ],
    },
  },
};

export default item;
