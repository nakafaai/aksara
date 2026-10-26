import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "repair-workshop",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The mistake showed that every repair should use new parts, so the writer later replaced the noisy brake immediately.",
        },
        {
          correct: false,
          label:
            "The mistake convinced the writer that service notes slow repairs, so the writer stopped recording observations.",
        },
        {
          correct: true,
          label:
            "The mistake showed that similar-looking parts still require records and measurements, a method the writer later applied before advising another volunteer.",
        },
        {
          correct: false,
          label:
            "The mistake mattered only because it took an hour, whereas the final-day decision was based on speed alone.",
        },
        {
          correct: false,
          label:
            "The mistake taught the writer to let Sari make uncertain decisions, which is why the writer avoided guiding the new volunteer.",
        },
      ],
    },
  },
};

export default item;
