import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "child-helmets",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "rencana itu menjawab catatan bahwa pengamatan belum mengukur kecelakaan atau cedera",
        },
        {
          correct: false,
          label:
            "rencana itu dibuat untuk membuktikan bahwa catatan petugas puskesmas keliru",
        },
        {
          correct: false,
          label: "rencana itu bertujuan menambah jumlah helm di setiap sekolah",
        },
        {
          correct: false,
          label:
            "rencana itu dibuat karena orang tua menolak anaknya memakai helm",
        },
        {
          correct: false,
          label:
            "rencana itu menggantikan pemeriksaan tali helm pada pengamatan berikutnya",
        },
      ],
    },
  },
};

export default item;
