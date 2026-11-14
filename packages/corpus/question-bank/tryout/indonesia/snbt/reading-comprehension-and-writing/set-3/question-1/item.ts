import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "resapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Kedua masalah itu* pada kalimat (3) merujuk pada genangan di Blok B dan genangan di Blok C.",
        },
        {
          correct: true,
          label:
            "*Program yang sama* pada kalimat (12) merujuk pada kewajiban setiap rumah membuat satu atau dua sumur resapan sesuai keadaan halamannya.",
        },
        {
          correct: false,
          label:
            "*Musim yang sama* pada kalimat (10) merujuk pada musim hujan tahun sebelumnya yang disebut pada kalimat (9).",
        },
        {
          correct: false,
          label:
            "*Mereka* pada kalimat (12) merujuk pada pengurus paguyuban warga Blok B dan Blok C.",
        },
        {
          correct: false,
          label:
            "*Usulan itu* pada kalimat (13) merujuk pada rencana pengurus RW menerapkan program sumur resapan di tiga blok lain.",
        },
      ],
    },
  },
};

export default item;
