import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "temple-moss",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Lumut sama sekali tidak berbahaya bagi batu candi." },
        { column: 1, label: "Gagasan bahwa lumut melindungi batu cukup beralasan, tetapi belum menjawab semua pertanyaan tentang retakan." },
        { column: 1, label: "Empat tahun belum cukup untuk menilai pengaruh jangka panjang penggosokan terhadap batu yang sangat tua." },
        { column: 2, label: "Lumut sebaiknya dibiarkan tumbuh di seluruh bagian candi, termasuk relief berukir." },
        { column: 1, label: "Manfaat membuang lumut perlu ditimbang terhadap batu yang ikut hilang karena cara membuangnya." },
      ],
    },
  },
};

export default item;
