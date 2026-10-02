import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal menguji versi revisi, lalu bagian berikutnya menjelaskan mengapa terjemahan harfiah dipilih kembali.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan tiga rute evakuasi, lalu bagian berikutnya menetapkan rute yang berlaku untuk semua kampung.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengubah istilah teknis, lalu bagian berikutnya menguji hasil revisi pada peserta yang sama untuk menilai daya ingat.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menemukan gangguan sinyal, lalu bagian berikutnya memperbaiki pemancar tanpa mengubah isi pesan.",
        },
        {
          isCorrect: true,
          label:
            "Kegagalan versi harfiah menjadi dasar perancangan bersama, lalu uji kedua menyediakan bukti untuk menilai hasil revisi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
