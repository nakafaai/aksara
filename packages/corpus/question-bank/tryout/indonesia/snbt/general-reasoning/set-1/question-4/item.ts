import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "bibit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pupuk cair menghasilkan bibit yang lebih tinggi daripada kompos pada kedua waktu penyiraman.",
        },
        {
          correct: false,
          label:
            "Penyiraman sore membuat bibit lebih tinggi pada setiap jenis perlakuan pupuk.",
        },
        {
          correct: false,
          label:
            "Kompos tidak menambah tinggi bibit apabila bibit disiram pada sore hari.",
        },
        {
          correct: false,
          label:
            "Bibit tanpa pupuk akan menyamai tinggi bibit berkompos jika pengamatan diperpanjang beberapa minggu lagi.",
        },
        {
          correct: true,
          label:
            "Pengaruh waktu penyiraman terhadap tinggi bibit paling besar pada bibit yang diberi pupuk cair.",
        },
      ],
    },
  },
};

export default item;
