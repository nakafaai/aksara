import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "mini-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "program itu menaikkan batas setoran minimal menjadi Rp20.000",
        },
        {
          correct: false,
          label:
            "program itu dibuat karena jumlah penabung turun pada tahun kedua",
        },
        {
          correct: false,
          label: "program itu menggantikan buku tabungan siswa",
        },
        {
          correct: true,
          label:
            "program itu dibuat untuk mendorong siswa menabung secara teratur sepanjang semester, bukan hanya di awal",
        },
        {
          correct: false,
          label: "program itu tidak berhubungan dengan turunnya setoran",
        },
      ],
    },
  },
};

export default item;
