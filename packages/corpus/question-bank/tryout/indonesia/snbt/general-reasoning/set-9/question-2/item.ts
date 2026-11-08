import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "ulat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harga perangkap feromon terjangkau bagi sebagian besar petani bawang merah di Desa Sukamulya.",
        },
        {
          correct: true,
          label:
            "Kedua kelompok petak ditanami varietas sama, dirawat sama, dan petaknya dipilih secara acak.",
        },
        {
          correct: false,
          label:
            "Hujan turun hampir setiap hari selama bulan pengamatan di Desa Sukamulya.",
        },
        {
          correct: false,
          label:
            "Ulat grayak juga sering menyerang tanaman cabai yang ditanam di desa itu.",
        },
        {
          correct: false,
          label:
            "Petani di desa-desa lain di kabupaten itu belum mengenal perangkap feromon.",
        },
      ],
    },
  },
};

export default item;
