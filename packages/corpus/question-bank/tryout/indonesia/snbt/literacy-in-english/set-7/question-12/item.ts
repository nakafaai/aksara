import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "cycling-safety",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Per million kilometres cycled, cyclists in Eastvale were injured about twice as often as cyclists in Riverton.",
        },
        {
          column: 2,
          label: "Riverton recorded fewer cycling injuries than Eastvale.",
        },
        {
          column: 1,
          label:
            "Per resident, Eastvale had fewer cycling injuries than Riverton.",
        },
        {
          column: 2,
          label:
            "The table shows that Riverton's bike lanes caused its lower injury rate.",
        },
        {
          column: 2,
          label:
            "On average, Riverton's residents each cycled a shorter distance than Eastvale's residents.",
        },
      ],
    },
  },
};

export default item;
