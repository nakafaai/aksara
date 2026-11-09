import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "sign-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Relawan tuli mengajar peserta dengan sabar.",
        },
        {
          correct: false,
          label: "Banyak peserta merasa kelas itu menyenangkan.",
        },
        {
          correct: true,
          label:
            "Peserta kelas bahasa isyarat baru berjumlah tiga puluh orang, sedangkan pekerja di wilayah kelurahan itu ribuan orang.",
        },
        {
          correct: false,
          label: "Balai warga juga membuka kelas menulis setiap Minggu.",
        },
        {
          correct: false,
          label: "Peserta belajar mengeja abjad dengan jari.",
        },
      ],
    },
  },
};

export default item;
