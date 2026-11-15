import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Turtle and frog: step $$3$$, turtle and bat: step $$2$$",
        },
        {
          correct: false,
          label: "Turtle and frog: step $$4$$, turtle and bat: step $$2$$",
        },
        {
          correct: true,
          label: "Turtle and frog: step $$4$$, turtle and bat: step $$3$$",
        },
        {
          correct: false,
          label: "Turtle and frog: step $$3$$, turtle and bat: step $$3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyu dan katak: langkah $$3$$, penyu dan kelawar: langkah $$2$$",
        },
        {
          correct: false,
          label:
            "Penyu dan katak: langkah $$4$$, penyu dan kelawar: langkah $$2$$",
        },
        {
          correct: true,
          label:
            "Penyu dan katak: langkah $$4$$, penyu dan kelawar: langkah $$3$$",
        },
        {
          correct: false,
          label:
            "Penyu dan katak: langkah $$3$$, penyu dan kelawar: langkah $$3$$",
        },
      ],
    },
  },
};

export default item;
