import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "cuckoo-eggs",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The idea in the second paragraph that accepting hosts are simply fooled, on the grounds that hosts in fact reject every cuckoo egg once they have seen a cuckoo.",
        },
        {
          correct: false,
          label:
            "The idea in the third paragraph that rejection is costly, on the grounds that accepting a cuckoo egg costs the host its whole brood.",
        },
        {
          correct: true,
          label:
            "The idea in the second paragraph that accepting hosts are simply fooled, on the grounds that acceptance can be a sensible bet where cuckoos are rare.",
        },
        {
          correct: false,
          label:
            "The idea in the second paragraph that cuckoo eggs match host eggs, on the grounds that the field experiments found the match to be poor.",
        },
        {
          correct: false,
          label:
            "The idea in the first paragraph that the cuckoo chick pushes out the host's eggs, on the grounds that most hosts reject cuckoo eggs before they hatch.",
        },
      ],
    },
  },
};

export default item;
