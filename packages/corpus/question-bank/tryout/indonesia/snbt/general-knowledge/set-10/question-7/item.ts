import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "kemampuan mengikuti asal, perpindahan, dan penanganan sesuatu melalui catatan",
        },
        {
          isCorrect: false,
          label: "pencetakan satu nama tempat pada bagian depan kemasan",
        },
        {
          isCorrect: false,
          label: "perhitungan harga jual dari seluruh biaya produksi",
        },
        {
          isCorrect: false,
          label:
            "jaminan bahwa setiap produk di rantai pasok selalu bermutu baik",
        },
        {
          isCorrect: false,
          label: "pengurutan produk menurut nama secara alfabetis",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
