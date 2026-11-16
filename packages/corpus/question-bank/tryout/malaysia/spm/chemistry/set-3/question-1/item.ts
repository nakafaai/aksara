import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Student R is both accurate and precise, because the mean of R's readings is exactly 25.00 cm³" },
        { correct: true, label: "Students P and S are precise but not accurate, and their readings carry a systematic error" },
        { correct: false, label: "Student R is precise, because R's readings span the widest range" },
        { correct: false, label: "Student Q's readings show the largest random error of the four students" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Murid R jitu dan persis, kerana min bacaan R tepat 25.00 cm³" },
        { correct: true, label: "Murid P dan S persis tetapi tidak jitu, dan bacaan mereka mengandungi ralat sistematik" },
        { correct: false, label: "Murid R persis, kerana bacaan R mempunyai julat paling luas" },
        { correct: false, label: "Bacaan murid Q menunjukkan ralat rawak paling besar antara empat murid" },
      ],
    },
  },
};

export default item;
