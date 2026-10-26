import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tindakan itu mengganti tuntutan tugas dari lima penanda menjadi tiga suara tanpa perlu menjelaskan perubahan kepada pembaca.",
        },
        {
          correct: false,
          label:
            "Tindakan itu mengalihkan perhatian Laras dari jalur tertutup sehingga konflik tentang kelengkapan hilang dengan sendirinya.",
        },
        {
          correct: true,
          label:
            "Tindakan itu mengubah keterbatasan menjadi dokumentasi yang memiliki waktu dan tempat, sehingga Laras tidak perlu memakai bukti yang bukan pengalamannya.",
        },
        {
          correct: false,
          label:
            "Tindakan itu membuktikan rekaman suara selalu lebih dapat dipercaya daripada foto karena suara tidak dapat dipilih atau disunting.",
        },
        {
          correct: false,
          label:
            "Tindakan itu terutama bertujuan menghemat baterai agar Laras tetap dapat mengunduh foto lama dari arsip sekolah.",
        },
      ],
    },
  },
};

export default item;
