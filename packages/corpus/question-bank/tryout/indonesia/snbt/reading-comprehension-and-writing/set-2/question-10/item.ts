import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "jelantah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kata _menyetor_ pada kalimat (5) diganti _menitipkan_",
        },
        {
          correct: false,
          label: "kata _mengelolanya_ pada kalimat (7) diganti _mengurusnya_",
        },
        {
          correct: false,
          label:
            "frasa _berulang kali_ pada kalimat (3) diganti _terlalu lama_",
        },
        {
          correct: false,
          label: "kata _dijernihkan_ pada kalimat (13) diganti _dimurnikan_",
        },
        {
          correct: true,
          label: "kata _mengelolanya_ pada kalimat (7) diganti _mengolahnya_",
        },
      ],
    },
  },
};

export default item;
