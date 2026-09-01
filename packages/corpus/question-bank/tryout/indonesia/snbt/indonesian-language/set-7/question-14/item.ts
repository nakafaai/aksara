import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Definisi *alur layanan* menunjukkan bahwa ukuran tanpa kembali hanya menilai kelancaran urutan, bukan seluruh mutu layanan seperti waktu tunggu, ketepatan tindakan, dan aksesibilitas.",
        },
        {
          isCorrect: false,
          label:
            "Definisi *alur layanan* membuktikan bahwa penanda baru sudah memperbaiki setiap tahap layanan bagi seluruh pasien.",
        },
        {
          isCorrect: false,
          label:
            "Definisi *alur layanan* menjadikan jumlah pasien tanpa kembali sebagai ukuran lengkap ketepatan tindakan medis.",
        },
        {
          isCorrect: false,
          label:
            "Definisi *alur layanan* menghapus perlunya masukan aksesibilitas karena urutan kegiatan sudah dapat dihitung.",
        },
        {
          isCorrect: false,
          label:
            "Definisi *alur layanan* menjelaskan mengapa kebutuhan medis pasien pasti sama pada setiap giliran yang dipasangkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
