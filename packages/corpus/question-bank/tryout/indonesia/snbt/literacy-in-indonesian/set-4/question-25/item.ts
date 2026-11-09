import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "banda-nutmeg",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "VOC memindahkan seluruh kebun pala dari Banda ke Batavia.",
        },
        {
          correct: false,
          label:
            "Permintaan pala di Eropa hilang setelah ditemukan bumbu lain.",
        },
        {
          correct: false,
          label:
            "Penduduk Banda kembali menguasai perdagangan pala secara bebas.",
        },
        {
          correct: true,
          label: "Bibit pala ditanam di tempat lain sehingga harga pala turun.",
        },
        {
          correct: false,
          label: "Perjanjian Breda melarang perdagangan pala dari Maluku.",
        },
      ],
    },
  },
};

export default item;
