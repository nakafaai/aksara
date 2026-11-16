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
        { correct: false, label: "Astatine is a gas at room temperature, and it is more reactive than iodine" },
        { correct: true, label: "Astatine is a dark solid, and it reacts with hot iron wool more slowly than iodine because its outer shell is farther from the nucleus" },
        { correct: false, label: "Astatine displaces iodine from potassium iodide solution" },
        { correct: false, label: "Astatine melts below iodine, because its molecules are larger" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Astatin ialah gas pada suhu bilik, dan ia lebih reaktif daripada iodin" },
        { correct: true, label: "Astatin ialah pepejal gelap, dan ia bertindak balas dengan wul besi panas lebih perlahan daripada iodin kerana petala luarnya lebih jauh dari nukleus" },
        { correct: false, label: "Astatin menyesarkan iodin daripada larutan kalium iodida" },
        { correct: false, label: "Astatin melebur di bawah iodin, kerana molekulnya lebih besar" },
      ],
    },
  },
};

export default item;
