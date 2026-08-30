import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa menggunakan model untuk mengulang langkah dan memeriksa hubungan antarbagiannya.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam model jaring-jaring makanan di kebun sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam model jaring-jaring makanan di kebun sekolah memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan model jaring-jaring makanan di kebun sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut jaring-jaring makanan sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
