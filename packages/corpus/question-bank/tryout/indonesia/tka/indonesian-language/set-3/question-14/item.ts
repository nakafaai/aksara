import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "terdapat pola yang mendukung perbaikan layanan, tetapi faktor lain masih perlu diukur",
        },
        {
          isCorrect: false,
          label:
            "kenaikan volume air isi ulang dapat langsung diterjemahkan menjadi jumlah botol yang dihindari",
        },
        {
          isCorrect: false,
          label:
            "penghitungan pada satu jam yang sama dipakai sebagai perkiraan harian tanpa sampel waktu lain",
        },
        {
          isCorrect: false,
          label: "suhu tidak mungkin memengaruhi kebutuhan minum",
        },
        {
          isCorrect: false,
          label: "stasiun isi ulang harus dihentikan",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
