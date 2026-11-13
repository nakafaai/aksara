import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "land-subsidence",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Stasiun pasang surut di dermaga pelabuhan mencatat air naik sekitar $$6{,}4$$ cm per tahun terhadap dermaga.",
        },
        {
          column: 2,
          label:
            "Selisih laju penurunan antara pelabuhan dan pantai timur membuktikan bahwa setiap rumah tangga di sekitar pelabuhan memompa lebih banyak air.",
        },
        {
          column: 1,
          label:
            "Seandainya tanah di pelabuhan berhenti turun sama sekali, pasang tertinggi di sana tetap makin tinggi terhadap dermaga, hanya jauh lebih lambat.",
        },
        {
          column: 2,
          label:
            "Di pantai timur, kenaikan permukaan laut menyumbang lebih dari separuh kenaikan muka laut relatif.",
        },
      ],
    },
  },
};

export default item;
