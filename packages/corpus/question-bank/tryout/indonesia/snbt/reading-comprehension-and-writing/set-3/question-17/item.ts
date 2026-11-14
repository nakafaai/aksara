import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "assumption",
  },
  stimulus: "angkutan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Setiap siswa penerima uang transpor dapat mencapai halte bus yang menuju sekolahnya tanpa naik ojek.",
        },
        {
          correct: false,
          label:
            "Setiap siswa penerima uang transpor tinggal tidak lebih dari $$1$$ kilometer dari halte bus.",
        },
        {
          correct: false,
          label:
            "Semua siswa penerima uang transpor kini berangkat ke sekolah dengan bus setiap hari.",
        },
        {
          correct: false,
          label:
            "Tidak ada siswa penerima uang transpor yang mengikuti kegiatan ekstrakurikuler.",
        },
        {
          correct: false,
          label:
            "Biaya menjalankan bus sekolah lebih kecil daripada jumlah uang transpor yang selama ini dibagikan.",
        },
      ],
    },
  },
};

export default item;
