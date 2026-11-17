import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
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
            "$$24^\\circ$$, and under water the ray is still trapped in the diamond",
        },
        {
          correct: false,
          label:
            "$$24^\\circ$$, and the ray leaves the diamond at $$66^\\circ$$ and then escapes the water into the air",
        },
        {
          correct: true,
          label:
            "$$24^\\circ$$, and the ray leaves the diamond at $$66^\\circ$$ but is then trapped at the water surface",
        },
        {
          correct: false,
          label:
            "$$24^\\circ$$, and the ray leaves the diamond at $$16^\\circ$$ and then escapes the water into the air",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$24^\\circ$$, dan di dalam air sinar itu masih terperangkap dalam berlian",
        },
        {
          correct: false,
          label:
            "$$24^\\circ$$, dan sinar itu keluar dari berlian pada $$66^\\circ$$ kemudian keluar dari air ke udara",
        },
        {
          correct: true,
          label:
            "$$24^\\circ$$, dan sinar itu keluar dari berlian pada $$66^\\circ$$ tetapi kemudian terperangkap di permukaan air",
        },
        {
          correct: false,
          label:
            "$$24^\\circ$$, dan sinar itu keluar dari berlian pada $$16^\\circ$$ kemudian keluar dari air ke udara",
        },
      ],
    },
  },
};

export default item;
