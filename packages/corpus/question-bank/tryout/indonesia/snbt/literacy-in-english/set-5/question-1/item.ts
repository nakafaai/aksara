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
            "The critics were right to demand a mechanism, and the seafloor later supplied the force that drives the plates, which is why drift was finally accepted.",
        },
        {
          correct: false,
          label:
            "The critics were wrong to demand a mechanism at all, since a theory that describes a pattern needs no cause, and the seafloor later confirmed drift.",
        },
        {
          correct: false,
          label:
            "The critics were right to demand a mechanism but wrong to treat its absence as disproof, and the seafloor later confirmed that continents plough through the ocean floor.",
        },
        {
          correct: false,
          label:
            "The critics were right to demand a mechanism, and their land bridges explained the shared fossils as well as drift did until the seafloor evidence arrived.",
        },
      ],
    },
  },
};

export default item;
