import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "minimum-wage",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Sebagian berarti dari tambahan upah pekerja berupah minimum dibelanjakan di dalam Kabupaten Sukaraja." },
        { column: 1, label: "Pengusaha tidak menanggapi kenaikan upah dengan memangkas banyak pekerja." },
        { column: 2, label: "Semua pekerja berupah minimum di Sukaraja bekerja di perusahaan besar." },
        { column: 2, label: "Harga barang di Sukaraja sama sekali tidak naik setelah upah minimum naik." },
      ],
    },
  },
};

export default item;
