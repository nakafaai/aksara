import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A real image $$53\\text{ cm}$$ in front, $$9.5\\text{ cm}$$ wide, growing $$6.3$$ times at $$2.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "A virtual image $$48\\text{ cm}$$ behind, $$1.8\\text{ m}$$ wide, not growing at $$2.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "A virtual image $$48\\text{ cm}$$ behind, $$8.6\\text{ cm}$$ wide, growing $$5$$ times at $$2.0\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "A virtual image $$48\\text{ cm}$$ behind, $$8.6\\text{ cm}$$ wide, growing $$4.2$$ times at $$2.0\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Imej nyata $$53\\text{ cm}$$ di hadapan, selebar $$9.5\\text{ cm}$$, membesar $$6.3$$ kali pada $$2.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "Imej maya $$48\\text{ cm}$$ di belakang, selebar $$1.8\\text{ m}$$, tidak membesar pada $$2.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "Imej maya $$48\\text{ cm}$$ di belakang, selebar $$8.6\\text{ cm}$$, membesar $$5$$ kali pada $$2.0\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "Imej maya $$48\\text{ cm}$$ di belakang, selebar $$8.6\\text{ cm}$$, membesar $$4.2$$ kali pada $$2.0\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
