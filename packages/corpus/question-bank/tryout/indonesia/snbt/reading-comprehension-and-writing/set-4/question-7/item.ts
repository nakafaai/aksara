import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "revision",
  },
  stimulus: "gambut",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada kalimat (8), _baru mereka akan tinggalkan_ diubah menjadi _baru akan mereka tinggalkan_.",
        },
        { column: 1, label: "Pada kalimat (9), kata _saling_ dihapus." },
        {
          column: 2,
          label:
            "Pada kalimat (9), kata _para_ dihapus karena kata _relawan_ sudah bermakna jamak.",
        },
        {
          column: 2,
          label: "Pada kalimat (11), kata _daripada_ diganti dengan _dari_.",
        },
      ],
    },
  },
};

export default item;
