import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "angkutan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Melalui program itu, pemerintah kabupaten berharap pengeluaran keluarga untuk ongkos ojek dapat berkurang dan siswa tidak lagi tiba di sekolah dalam keadaan sangat lelah sekali.",
        },
        {
          correct: false,
          label:
            "Melalui program itu, pemerintah kabupaten berharap pengeluaran keluarga untuk ongkos ojek dapat berkurang dan supaya siswa tidak lagi tiba di sekolah dalam keadaan lelah sekali.",
        },
        {
          correct: true,
          label:
            "Melalui program itu, pemerintah kabupaten berharap pengeluaran keluarga untuk ongkos ojek dapat berkurang dan siswa tidak lagi tiba di sekolah dalam keadaan sangat lelah.",
        },
        {
          correct: false,
          label:
            "Melalui program itu, pemerintah kabupaten berharap pengeluaran keluarga untuk ongkos ojek dapat berkurang sehingga siswa tidak lagi tiba di sekolah dalam keadaan sangat lelah.",
        },
        {
          correct: false,
          label:
            "Melalui program itu, pemerintah kabupaten berharap pengurangan pengeluaran keluarga untuk ongkos ojek dan siswa tidak lagi tiba di sekolah dalam keadaan sangat lelah.",
        },
      ],
    },
  },
};

export default item;
