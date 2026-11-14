import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "keroncong-origin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa keroncong makin lama makin mendekati musik Eropa",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa kendang tidak lagi disukai para pemain keroncong",
        },
        {
          correct: true,
          label:
            "menunjukkan bahwa alat yang masuk dari luar dipakai menurut kebutuhan musik setempat, sehingga menguatkan gagasan bahwa keroncong dibentuk di Nusantara",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa selo lebih dahulu hadir dalam keroncong daripada cak dan cuk",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa para pemain keroncong pada masa itu belum mampu menggesek selo",
        },
      ],
    },
  },
};

export default item;
