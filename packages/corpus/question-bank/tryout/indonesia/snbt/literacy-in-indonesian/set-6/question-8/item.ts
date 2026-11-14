import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "conclusion",
  },
  stimulus: "kite-maker",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kakek menahan diri untuk tidak menceramahi cucunya, walaupun ia punya alasan untuk itu.",
        },
        {
          column: 2,
          label:
            "Layangan putih itu dibuat Kakek khusus untuk mengganti layangan naga yang hilang.",
        },
        { column: 1, label: "Pesanan layangan buatan Kakek sedang surut." },
        {
          column: 2,
          label:
            "Pada akhir cerita, tokoh _aku_ masih menganggap cara kerja Kakek terlalu lambat.",
        },
      ],
    },
  },
};

export default item;
