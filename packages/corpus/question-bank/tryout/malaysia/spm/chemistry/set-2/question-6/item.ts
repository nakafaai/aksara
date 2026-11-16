import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The melting point decreases, so the atoms react more easily" },
        { correct: false, label: "The atomic radius decreases, so the nucleus holds the valence electron more weakly" },
        { correct: true, label: "The valence electron is further from the nucleus, so it is lost more easily" },
        { correct: false, label: "The number of valence electrons increases, so more electrons are lost" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Takat lebur berkurang, jadi atom bertindak balas dengan lebih mudah" },
        { correct: false, label: "Jejari atom berkurang, jadi nukleus menarik elektron valens dengan lebih lemah" },
        { correct: true, label: "Elektron valens lebih jauh dari nukleus, jadi ia lebih mudah dilepaskan" },
        { correct: false, label: "Bilangan elektron valens bertambah, jadi lebih banyak elektron dilepaskan" },
      ],
    },
  },
};

export default item;
