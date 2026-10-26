import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "kemampuan mengikuti asal, perpindahan, dan penanganan sesuatu melalui catatan",
        },
        {
          correct: false,
          label: "pencetakan satu nama tempat pada bagian depan kemasan",
        },
        {
          correct: false,
          label: "perhitungan harga jual dari seluruh biaya produksi",
        },
        {
          correct: false,
          label:
            "jaminan bahwa setiap produk di rantai pasok selalu bermutu baik",
        },
        {
          correct: false,
          label: "pengurutan produk menurut nama secara alfabetis",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
