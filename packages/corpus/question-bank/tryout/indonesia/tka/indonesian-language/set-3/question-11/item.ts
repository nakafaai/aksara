import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "terdapat pola yang mendukung perbaikan layanan, tetapi faktor lain masih perlu diukur",
        },
        {
          correct: false,
          label:
            "kenaikan volume air isi ulang dapat langsung diterjemahkan menjadi jumlah botol yang dihindari",
        },
        {
          correct: false,
          label:
            "penghitungan pada satu jam yang sama dipakai sebagai perkiraan harian tanpa sampel waktu lain",
        },
        {
          correct: false,
          label: "suhu tidak mungkin memengaruhi kebutuhan minum",
        },
        {
          correct: false,
          label: "stasiun isi ulang harus dihentikan",
        },
      ],
    },
  },
  stimulus: "refill-station",
};

export default item;
