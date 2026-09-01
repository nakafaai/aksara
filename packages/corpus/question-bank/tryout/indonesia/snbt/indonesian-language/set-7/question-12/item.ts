import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perbedaan 56 dan 42 tidak memberi informasi apa pun karena kebutuhan medis tiap pasien tidak sama.",
        },
        {
          isCorrect: true,
          label:
            "Hasil 56 dari 60 dibandingkan 42 dari 60 mendukung uji lanjut, tetapi belum menunjukkan bahwa penanda saja menyebabkan perbedaan karena kebutuhan pasien antargiliran tidak disamakan.",
        },
        {
          isCorrect: false,
          label:
            "Kesamaan jadwal dan jumlah petugas sudah cukup memastikan bahwa penanda baru menjadi satu-satunya penyebab perbedaan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Data pengamatan awal 40 dari 60 membuktikan bahwa penanda lama selalu membuat tepat sepertiga pasien salah mengikuti alur.",
        },
        {
          isCorrect: false,
          label:
            "Karena kedua kondisi masing-masing memuat 60 pasien, hasilnya dapat digeneralisasi ke semua klinik tanpa uji tambahan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
