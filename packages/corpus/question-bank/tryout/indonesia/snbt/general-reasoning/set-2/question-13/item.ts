import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Inlandsbeschaffung und Reisimporte werden als gleichläufig beschrieben",
        },
        {
          isCorrect: false,
          label:
            "Der Text beschreibt keinen Zusammenhang zwischen Inlandsbeschaffung und Reisimporten",
        },
        {
          isCorrect: true,
          label:
            "Inlandsbeschaffung und Reisimporte werden als gegenläufig beschrieben",
        },
        {
          isCorrect: false,
          label:
            "Inlandsbeschaffung und Reisexporte werden als gegenläufig beschrieben",
        },
        {
          isCorrect: false,
          label:
            "Die Lösung der Überarbeitung der Präsidialverordnung Nr. $$63$$ von $$2017$$ wird die Budgetzuweisungen ändern",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Domestic procurement and rice imports are described as moving in the same direction",
        },
        {
          isCorrect: false,
          label:
            "The passage describes no relationship between domestic procurement and rice imports",
        },
        {
          isCorrect: true,
          label:
            "Domestic procurement and rice imports are described as moving in opposite directions",
        },
        {
          isCorrect: false,
          label:
            "Domestic procurement and rice exports are described as moving in opposite directions",
        },
        {
          isCorrect: false,
          label:
            "The solution of revising Presidential Regulation Number $$63$$ of $$2017$$ will change budget allocations",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Serapan dalam negeri dan impor beras digambarkan bergerak searah",
        },
        {
          isCorrect: false,
          label:
            "Bacaan tidak menggambarkan hubungan antara serapan dalam negeri dan impor beras",
        },
        {
          isCorrect: true,
          label:
            "Serapan dalam negeri dan impor beras digambarkan bergerak berlawanan arah",
        },
        {
          isCorrect: false,
          label:
            "Serapan dalam negeri dan ekspor beras digambarkan bergerak berlawanan arah",
        },
        {
          isCorrect: false,
          label:
            "Solusi merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ akan mengubah alokasi anggaran",
        },
      ],
    },
  },
};

export default item;
