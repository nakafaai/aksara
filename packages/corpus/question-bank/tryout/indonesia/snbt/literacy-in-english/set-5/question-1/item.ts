import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "continental-drift",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The critics were right to demand a mechanism but wrong to treat its absence as disproof, and the seafloor later confirmed drift while ruling out the ploughing Wegener had proposed.",
        },
        {
          correct: false,
          label:
            "Geologists dismissed Wegener's fossils and coastlines mainly because he was a meteorologist rather than one of their own, and the seafloor findings of the 1950s and 1960s finally exposed that professional bias for what it was.",
        },
        {
          correct: false,
          label:
            "Seafloor spreading supplied the driving force that Wegener had lacked, which is why his theory won acceptance soon after Hess published his idea in 1962.",
        },
        {
          correct: false,
          label:
            "Until the 1950s the land-bridge explanation was better supported than Wegener's evidence, and only new measurements of the seafloor reversed the balance between the two.",
        },
        {
          correct: false,
          label:
            "The critics were right that a continent cannot plough through solid rock, so the later evidence showed that the continents have stayed roughly where they formed.",
        },
      ],
    },
  },
};

export default item;
