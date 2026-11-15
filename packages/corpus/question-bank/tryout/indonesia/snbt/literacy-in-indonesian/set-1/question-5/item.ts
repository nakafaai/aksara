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
        { column: 2, label: "Data uji coba menunjukkan bahwa lumut tidak melebarkan retakan pada batu candi." },
        { column: 1, label: "Selisih antara kelompok I dan kelompok II menunjukkan bahwa sebagian batu yang hilang berasal dari cara membuang lumut." },
        { column: 2, label: "Karena kelompok III kehilangan permukaan paling sedikit, lumut sebaiknya juga dibiarkan tumbuh pada relief berukir." },
        { column: 1, label: "Urutan kehilangan permukaan ketiga kelompok sejalan dengan dugaan bahwa siklus basah kering merusak batu." },
        { column: 2, label: "Hasil uji coba dapat langsung dipakai untuk menentukan perawatan candi batu kapur di daerah beriklim kering." },
      ],
    },
  },
};

export default item;
