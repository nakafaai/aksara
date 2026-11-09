import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "sign-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Balai Warga Kelurahan Bandarjaya",
        },
        {
          correct: false,
          label: "Mengeja Abjad dengan Jari",
        },
        {
          correct: false,
          label: "Relawan dari Komunitas Tuli",
        },
        {
          correct: false,
          label: "Pegawai Bank Belajar pada Akhir Pekan",
        },
        {
          correct: true,
          label: "Kelas Bahasa Isyarat Membantu Warga Melayani Orang Tuli",
        },
      ],
    },
  },
};

export default item;
