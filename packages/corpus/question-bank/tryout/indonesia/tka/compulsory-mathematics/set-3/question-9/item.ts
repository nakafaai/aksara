import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$f$$ mempunyai invers, dan rumusnya $$f^{-1}(x)=2+\\sqrt{x-3}$$.",
        },
        {
          correct: false,
          label: "Daerah asal $$f^{-1}$$ adalah $$\\{x\\mid x\\ge3\\}$$.",
        },
        {
          correct: true,
          label: "$$f^{-1}(12)=-1$$.",
        },
        {
          correct: false,
          label: "$$f^{-1}(g(a))=a$$ untuk setiap bilangan real $$a\\le2$$.",
        },
        {
          correct: true,
          label: "$$f^{-1}(g(a))=4-a$$ untuk setiap bilangan real $$a\\ge3$$.",
        },
      ],
    },
  },
};

export default item;
