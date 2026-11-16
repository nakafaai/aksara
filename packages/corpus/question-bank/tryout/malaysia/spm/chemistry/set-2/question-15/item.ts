import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Tin atoms form covalent bonds with the copper atoms" },
        { correct: true, label: "The tin atoms differ in size from copper atoms, so they disrupt the orderly layers and the layers cannot slide easily" },
        { correct: false, label: "Bronze has no free electrons between its atoms" },
        { correct: false, label: "Tin atoms fill the spaces between copper atoms, so bronze is denser" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Atom stanum membentuk ikatan kovalen dengan atom kuprum" },
        { correct: true, label: "Saiz atom stanum berbeza daripada atom kuprum, jadi ia mengganggu susunan lapisan yang teratur dan lapisan tidak mudah menggelongsor" },
        { correct: false, label: "Gangsa tidak mempunyai elektron bebas antara atomnya" },
        { correct: false, label: "Atom stanum mengisi ruang antara atom kuprum, jadi gangsa lebih tumpat" },
      ],
    },
  },
};

export default item;
