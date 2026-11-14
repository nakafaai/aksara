import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "jelantah",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada kalimat (2), kata _sehingga_ diganti dengan _sedangkan_ yang didahului tanda koma.",
        },
        {
          column: 2,
          label:
            "Pada kalimat (4), kata _adapun_ diganti dengan _akibatnya_ yang diikuti tanda koma.",
        },
        {
          column: 2,
          label:
            "Pada kalimat (5), tanda koma ditambahkan setelah kata _kelurahan_.",
        },
        {
          column: 1,
          label: "Pada kalimat (5), kata _bagi_ dihapus.",
        },
      ],
    },
  },
};

export default item;
