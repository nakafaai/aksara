import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "antrean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Antrean daring membuat banyak pasien per hari bertambah dua kali lipat.",
        },
        {
          correct: false,
          label:
            "Waktu tunggu pada setiap jam kedatangan turun setelah antrean daring dipakai.",
        },
        {
          correct: false,
          label:
            "Pada bulan Mei, pasien yang datang pukul 11.00 sampai 12.00 menunggu paling lama.",
        },
        {
          correct: true,
          label:
            "Setelah antrean daring, kedatangan pasien lebih merata dan waktu tunggu di jam tersibuk turun.",
        },
        {
          correct: false,
          label:
            "Setelah ada antrean daring, pasien paling banyak memilih datang pada pukul 07.00 sampai 08.00 pagi.",
        },
      ],
    },
  },
};

export default item;
