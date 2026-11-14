import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Meskipun api di permukaan lahan sudah padam, mereka tetap menusukkan pipa berujung runcing ke dalam gambut, menyemprotkan air sampai lapisan bawahnya basah, dan memantau suhu gambut selama sedikitnya tiga hari.",
        },
        {
          correct: false,
          label:
            "Api di permukaan lahan sudah padam, tetapi mereka tetap menusukkan pipa berujung runcing ke dalam gambut, menyemprotkan air sampai lapisan bawahnya basah, dan pemantauan suhu gambut selama sedikitnya tiga hari.",
        },
        {
          correct: false,
          label:
            "Meskipun api di permukaan lahan sudah padam, tetapi mereka tetap menusukkan pipa berujung runcing ke dalam gambut, menyemprotkan air sampai lapisan bawahnya basah, dan memantau suhu gambut selama sedikitnya tiga hari.",
        },
        {
          correct: false,
          label:
            "Meskipun api di permukaan lahan sudah padam, mereka tetap menusukkan pipa berujung runcing ke dalam gambut, penyemprotan air sampai lapisan bawahnya basah, dan pemantauan suhu gambut selama sedikitnya tiga hari.",
        },
        {
          correct: false,
          label:
            "Meskipun api di permukaan lahan sudah padam, namun mereka tetap menusukkan pipa berujung runcing ke dalam gambut, menyemprotkan air sampai lapisan bawahnya basah, dan memantau suhu gambut selama sedikitnya tiga hari.",
        },
      ],
    },
  },
};

export default item;
