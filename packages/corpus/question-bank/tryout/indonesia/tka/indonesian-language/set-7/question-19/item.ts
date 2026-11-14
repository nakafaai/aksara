import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "rain-stage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sanggar memutuskan tidak akan pernah lagi menari di lapangan terbuka",
        },
        {
          correct: false,
          label: "para penari menolak tampil lagi karena kostum mereka basah",
        },
        {
          correct: true,
          label:
            "Bu Ratih melatih para penari menyesuaikan gerakan dengan keadaan panggung yang tidak terduga",
        },
        {
          correct: false,
          label: "Bu Ratih memarahi penabuh kendang yang bermain pelan",
        },
        {
          correct: false,
          label:
            "Laksmi dikeluarkan dari sanggar karena sanggulnya hampir lepas",
        },
      ],
    },
  },
};

export default item;
