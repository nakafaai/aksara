import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Perbedaan $$56$$ dan $$42$$ tidak memberi informasi apa pun karena kebutuhan medis tiap pasien tidak sama.",
        },
        {
          correct: true,
          label:
            "Hasil $$56$$ dari $$60$$ dibandingkan $$42$$ dari $$60$$ mendukung uji lanjut, tetapi belum menunjukkan bahwa penanda saja menyebabkan perbedaan karena kebutuhan pasien antargiliran tidak disamakan.",
        },
        {
          correct: false,
          label:
            "Kesamaan jadwal dan jumlah petugas sudah cukup memastikan bahwa penanda baru menjadi satu-satunya penyebab perbedaan hasil.",
        },
        {
          correct: false,
          label:
            "Data pengamatan awal $$40$$ dari $$60$$ membuktikan bahwa penanda lama selalu membuat tepat sepertiga pasien salah mengikuti alur.",
        },
        {
          correct: false,
          label:
            "Karena kedua kondisi masing-masing memuat $$60$$ pasien, hasilnya dapat digeneralisasi ke semua klinik tanpa uji tambahan.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
