import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$31^\\circ$$ upstream for $$37\\text{ s}$$, and the quickest crossing lands $$48\\text{ m}$$ downstream",
        },
        {
          correct: false,
          label:
            "$$37^\\circ$$ upstream for $$40\\text{ s}$$, and the quickest crossing also lands straight opposite",
        },
        {
          correct: true,
          label:
            "$$37^\\circ$$ upstream for $$40\\text{ s}$$, and the quickest crossing takes $$32\\text{ s}$$ and lands $$48\\text{ m}$$ downstream",
        },
        {
          correct: false,
          label:
            "$$37^\\circ$$ upstream for $$40\\text{ s}$$, and the quickest crossing takes $$32\\text{ s}$$ and lands $$60\\text{ m}$$ downstream",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$31^\\circ$$ ke hulu selama $$37\\text{ s}$$, dan penyeberangan terpantas mendarat $$48\\text{ m}$$ ke hilir",
        },
        {
          correct: false,
          label:
            "$$37^\\circ$$ ke hulu selama $$40\\text{ s}$$, dan penyeberangan terpantas juga mendarat tepat bertentangan",
        },
        {
          correct: true,
          label:
            "$$37^\\circ$$ ke hulu selama $$40\\text{ s}$$, dan penyeberangan terpantas mengambil $$32\\text{ s}$$ dan mendarat $$48\\text{ m}$$ ke hilir",
        },
        {
          correct: false,
          label:
            "$$37^\\circ$$ ke hulu selama $$40\\text{ s}$$, dan penyeberangan terpantas mengambil $$32\\text{ s}$$ dan mendarat $$60\\text{ m}$$ ke hilir",
        },
      ],
    },
  },
};

export default item;
