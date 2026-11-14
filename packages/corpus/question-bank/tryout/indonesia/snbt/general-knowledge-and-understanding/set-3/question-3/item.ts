import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "kabin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "hasil bahwa penutup kaca membuat kotaknya jauh lebih panas daripada penutup garam batu",
        },
        {
          correct: false,
          label:
            "hasil bahwa garam batu ternyata menahan inframerah sebanyak kaca",
        },
        {
          correct: true,
          label:
            "hasil bahwa menahan atau meloloskan inframerah hampir tidak mengubah suhu kotak yang tertutup",
        },
        {
          correct: false,
          label:
            "hasil bahwa sifat kaca sama sekali tidak berpengaruh terhadap suhu kotak",
        },
        {
          correct: false,
          label:
            "hasil bahwa kedua kotak tidak menjadi lebih panas daripada udara di luarnya",
        },
      ],
    },
  },
};

export default item;
