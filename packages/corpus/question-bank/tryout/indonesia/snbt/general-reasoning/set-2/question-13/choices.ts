import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Inlandsbeschaffung und Reisimporte werden als gegenläufig beschrieben",
      value: true,
    },
    {
      label:
        "Inlandsbeschaffung und Reisimporte werden als gleichläufig beschrieben",
      value: false,
    },
    {
      label:
        "Der Text beschreibt keinen Zusammenhang zwischen Inlandsbeschaffung und Reisimporten",
      value: false,
    },
    {
      label:
        "Inlandsbeschaffung und Reisexporte werden als gegenläufig beschrieben",
      value: false,
    },
    {
      label:
        "Die Lösung der Überarbeitung der Präsidialverordnung Nr. $$63$$ von $$2017$$ wird die Budgetzuweisungen ändern",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Domestic procurement and rice imports are described as moving in opposite directions",
      value: true,
    },
    {
      label:
        "Domestic procurement and rice imports are described as moving in the same direction",
      value: false,
    },
    {
      label:
        "The passage describes no relationship between domestic procurement and rice imports",
      value: false,
    },
    {
      label:
        "Domestic procurement and rice exports are described as moving in opposite directions",
      value: false,
    },
    {
      label:
        "The solution of revising Presidential Regulation Number $$63$$ of $$2017$$ will change budget allocations",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Serapan dalam negeri dan impor beras digambarkan bergerak berlawanan arah",
      value: true,
    },
    {
      label: "Serapan dalam negeri dan impor beras digambarkan bergerak searah",
      value: false,
    },
    {
      label:
        "Bacaan tidak menggambarkan hubungan antara serapan dalam negeri dan impor beras",
      value: false,
    },
    {
      label:
        "Serapan dalam negeri dan ekspor beras digambarkan bergerak berlawanan arah",
      value: false,
    },
    {
      label:
        "Solusi merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ akan mengubah alokasi anggaran",
      value: false,
    },
  ],
};

export default choices;
