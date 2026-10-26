import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Definisi *alur layanan* menunjukkan bahwa ukuran tanpa kembali hanya menilai kelancaran urutan, bukan seluruh mutu layanan seperti waktu tunggu, ketepatan tindakan, dan aksesibilitas.",
        },
        {
          correct: false,
          label:
            "Definisi *alur layanan* membuktikan bahwa penanda baru sudah memperbaiki setiap tahap layanan bagi seluruh pasien.",
        },
        {
          correct: false,
          label:
            "Definisi *alur layanan* menjadikan jumlah pasien tanpa kembali sebagai ukuran lengkap ketepatan tindakan medis.",
        },
        {
          correct: false,
          label:
            "Definisi *alur layanan* menghapus perlunya masukan aksesibilitas karena urutan kegiatan sudah dapat dihitung.",
        },
        {
          correct: false,
          label:
            "Definisi *alur layanan* menjelaskan mengapa kebutuhan medis pasien pasti sama pada setiap giliran yang dipasangkan.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
