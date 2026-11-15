import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "rumah beton yang dinding dan tiangnya dibuat jauh lebih tebal dan ditanam dalam fondasi agar tidak bergerak sama sekali",
        },
        {
          correct: true,
          label:
            "rumah kayu ringan yang sambungannya dapat sedikit bergerak dan berdiri di atas dudukan yang memungkinkan sedikit pergeseran",
        },
        {
          correct: false,
          label:
            "rumah beton beratap gonjong yang dicat menyerupai kayu agar tampak seperti rumah gadang",
        },
        {
          correct: false,
          label:
            "rumah kayu yang tiangnya ditanam dalam-dalam ke tanah dan setiap sambungannya dikunci rapat dengan paku baja",
        },
        {
          correct: false,
          label:
            "rumah kayu yang dibangun di atas tanah yang lebih tinggi agar tidak tergenang air hujan",
        },
      ],
    },
  },
};

export default item;
