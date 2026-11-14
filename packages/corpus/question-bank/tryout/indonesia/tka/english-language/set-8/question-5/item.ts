import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "reader-response",
  },
  stimulus: "train-station",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“The museum must be boring, because the clock does not even work.”",
        },
        {
          correct: false,
          label:
            "“The town should knock down the station and build a shopping mall.”",
        },
        {
          correct: false,
          label:
            "“The locomotive must still be able to pull passenger trains.”",
        },
        {
          correct: true,
          label:
            "“Seeing the stopped clock and hearing a former station master would help me imagine the station's last days.”",
        },
        {
          correct: false,
          label:
            "“I would be disappointed, because visitors cannot touch anything in the museum.”",
        },
      ],
    },
  },
};

export default item;
