import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam model daur air dalam kotak transparan.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam model daur air dalam kotak transparan memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label:
            "Siswa menggunakan model untuk mengulang langkah dan memeriksa hubungan antarbagiannya.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan model daur air dalam kotak transparan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut kondensasi sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
