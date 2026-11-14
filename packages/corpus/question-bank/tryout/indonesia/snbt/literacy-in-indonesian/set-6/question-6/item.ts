import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "kite-maker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ia ingin Kakek melihat bahwa layangan pabrikan itu berhasil, walaupun ia tidak mengatakannya.",
        },
        {
          correct: false,
          label:
            "Ia khawatir Kakek marah karena ia pergi ke lapangan tanpa pamit.",
        },
        {
          correct: false,
          label:
            "Ia ingin memanggil Kakek untuk membantunya memegang benang yang mulai menegang.",
        },
        {
          correct: false,
          label:
            "Ia merasa bersalah karena telah menghabiskan uang jajan tiga minggu.",
        },
        {
          correct: false,
          label: "Ia mencari tanda arah angin dari pepohonan di dekat rumah.",
        },
      ],
    },
  },
};

export default item;
