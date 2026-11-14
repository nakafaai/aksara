import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "revision",
  },
  stimulus: "kopi",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada kalimat (13), kata _dan_ di antara _pagi hari_ dan _sore hari_ diganti dengan _maupun_.",
        },
        {
          column: 2,
          label: "Pada kalimat (11), kata _agar_ diganti dengan _supaya_.",
        },
        { column: 2, label: "Pada kalimat (14), kata _bahwa_ dihapus." },
        { column: 1, label: "Pada kalimat (14), kata _menurut_ dihapus." },
      ],
    },
  },
};

export default item;
