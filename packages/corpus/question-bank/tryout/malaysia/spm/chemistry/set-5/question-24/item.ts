import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$23.4\\text{ g}$$, and a scratched tin coat would make the exposed steel rust faster",
        },
        {
          correct: false,
          label:
            "$$46.8\\text{ g}$$, and a scratched tin coat would make the exposed steel rust faster",
        },
        {
          correct: false,
          label:
            "$$23.4\\text{ g}$$, and a scratched tin coat would still protect the steel as zinc does",
        },
        {
          correct: false,
          label:
            "$$11.7\\text{ g}$$, and a scratched tin coat would make the exposed steel rust faster",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$23.4\\text{ g}$$, dan salutan stanum yang tercalar akan menjadikan keluli yang terdedah berkarat lebih cepat",
        },
        {
          correct: false,
          label:
            "$$46.8\\text{ g}$$, dan salutan stanum yang tercalar akan menjadikan keluli yang terdedah berkarat lebih cepat",
        },
        {
          correct: false,
          label:
            "$$23.4\\text{ g}$$, dan salutan stanum yang tercalar masih melindungi keluli seperti zink",
        },
        {
          correct: false,
          label:
            "$$11.7\\text{ g}$$, dan salutan stanum yang tercalar akan menjadikan keluli yang terdedah berkarat lebih cepat",
        },
      ],
    },
  },
};

export default item;
