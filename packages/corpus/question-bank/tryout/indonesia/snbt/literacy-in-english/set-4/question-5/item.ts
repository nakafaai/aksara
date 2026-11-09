import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "deep-vents",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Europa is known to have tube worms living beneath its ice.",
        },
        {
          correct: false,
          label:
            "Vent animals could be carried to Europa by deep ocean currents.",
        },
        {
          correct: true,
          label:
            "Chemical energy like that at vents might support life without light.",
        },
        {
          correct: false,
          label: "Europa's ice is made mostly of hydrogen sulphide from vents.",
        },
        {
          correct: false,
          label:
            "Scientists plan to move vent bacteria to Europa to start life there.",
        },
      ],
    },
  },
};

export default item;
