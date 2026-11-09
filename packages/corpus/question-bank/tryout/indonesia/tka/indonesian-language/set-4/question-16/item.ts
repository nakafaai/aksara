import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "chess-draw",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "merasa tersentil tetapi termotivasi karena kritik itu tepat dan disampaikan dengan hangat",
        },
        {
          correct: false,
          label: "merasa direndahkan karena Kakek mengejek kekalahan Bima",
        },
        {
          correct: false,
          label: "merasa puas karena Kakek mengakui bahwa Bima sudah menang",
        },
        {
          correct: false,
          label:
            "merasa takut karena Kakek akan berhenti bermain catur dengan Bima",
        },
        {
          correct: false,
          label:
            "merasa bingung karena kalimat Kakek tidak berhubungan dengan permainan",
        },
      ],
    },
  },
};

export default item;
