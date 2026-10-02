import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tindakan itu mengganti tuntutan tugas dari lima penanda menjadi tiga suara tanpa perlu menjelaskan perubahan kepada pembaca.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan itu mengalihkan perhatian Laras dari jalur tertutup sehingga konflik tentang kelengkapan hilang dengan sendirinya.",
        },
        {
          isCorrect: true,
          label:
            "Tindakan itu mengubah keterbatasan menjadi dokumentasi yang memiliki waktu dan tempat, sehingga Laras tidak perlu memakai bukti yang bukan pengalamannya.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan itu membuktikan rekaman suara selalu lebih dapat dipercaya daripada foto karena suara tidak dapat dipilih atau disunting.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan itu terutama bertujuan menghemat baterai agar Laras tetap dapat mengunduh foto lama dari arsip sekolah.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
