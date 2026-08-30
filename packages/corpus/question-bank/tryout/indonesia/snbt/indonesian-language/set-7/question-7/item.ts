import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam simulasi populasi dengan keping warna.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam simulasi populasi dengan keping warna memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan simulasi populasi dengan keping warna.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut daya dukung sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Siswa menggunakan model untuk mengulang langkah dan memeriksa hubungan antarbagiannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
