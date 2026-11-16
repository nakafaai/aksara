import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Radon boils below xenon, because it has fewer valence electrons" },
        { correct: true, label: "Radon boils above xenon, because its larger atoms attract each other more strongly" },
        { correct: false, label: "Radon boils below xenon, because noble gases become more reactive down the group" },
        { correct: false, label: "Radon boils at the same temperature as xenon, because both have a stable octet" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Radon mendidih di bawah xenon, kerana ia mempunyai lebih sedikit elektron valens" },
        { correct: true, label: "Radon mendidih di atas xenon, kerana atomnya yang lebih besar menarik satu sama lain dengan lebih kuat" },
        { correct: false, label: "Radon mendidih di bawah xenon, kerana gas adi menjadi lebih reaktif menuruni kumpulan" },
        { correct: false, label: "Radon mendidih pada suhu yang sama dengan xenon, kerana kedua-duanya mempunyai oktet yang stabil" },
      ],
    },
  },
};

export default item;
