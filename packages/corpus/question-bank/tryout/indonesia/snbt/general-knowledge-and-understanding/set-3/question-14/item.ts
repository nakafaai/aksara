import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bagian awal menguji versi revisi, lalu bagian berikutnya menjelaskan mengapa terjemahan harfiah dipilih kembali.",
        },
        {
          correct: false,
          label:
            "Bagian awal membandingkan tiga rute evakuasi, lalu bagian berikutnya menetapkan rute yang berlaku untuk semua kampung.",
        },
        {
          correct: false,
          label:
            "Bagian awal mengubah istilah teknis, lalu bagian berikutnya menguji hasil revisi pada peserta yang sama untuk menilai daya ingat.",
        },
        {
          correct: false,
          label:
            "Bagian awal menemukan gangguan sinyal, lalu bagian berikutnya memperbaiki pemancar tanpa mengubah isi pesan.",
        },
        {
          correct: true,
          label:
            "Kegagalan versi harfiah menjadi dasar perancangan bersama, lalu uji kedua menyediakan bukti untuk menilai hasil revisi.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
