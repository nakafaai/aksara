import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "spare-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "From thinking Gran had locked herself out by accident to learning that she had done it on purpose to test the narrator.",
        },
        {
          correct: false,
          label:
            "From feeling tricked by Gran's test to deciding that Gran should no longer live alone.",
        },
        {
          correct: false,
          label:
            "From worrying about Gran's memory to realising that Gran had remembered everything.",
        },
        {
          correct: false,
          label:
            "From feeling tricked by Gran's test to seeing that Gran's memory is perfect and the test was a joke.",
        },
        {
          correct: true,
          label:
            "From feeling tricked by Gran's test to seeing that the test covered Gran's difficulty, which the narrator then helps with without saying so.",
        },
      ],
    },
  },
};

export default item;
