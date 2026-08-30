import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam peta kartu daur karbon.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam peta kartu daur karbon memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan peta kartu daur karbon.",
        },
        {
          isCorrect: true,
          label:
            "Siswa menggunakan model untuk mengulang langkah dan memeriksa hubungan antarbagiannya.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut reservoir sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
