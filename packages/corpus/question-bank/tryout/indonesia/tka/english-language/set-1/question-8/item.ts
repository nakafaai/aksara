import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The mistake showed that every repair should use new parts, so the writer later replaced the noisy brake immediately.",
        },
        {
          isCorrect: false,
          label:
            "The mistake convinced the writer that service notes slow repairs, so the writer stopped recording observations.",
        },
        {
          isCorrect: true,
          label:
            "The mistake showed that similar-looking parts still require records and measurements, a method the writer later applied before advising another volunteer.",
        },
        {
          isCorrect: false,
          label:
            "The mistake mattered only because it took an hour, whereas the final-day decision was based on speed alone.",
        },
        {
          isCorrect: false,
          label:
            "The mistake taught the writer to let Sari make uncertain decisions, which is why the writer avoided guiding the new volunteer.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
