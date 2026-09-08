import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Versuch im Schulstudio.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Versuch im Schulstudio formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zum Versuch im Schulstudio formulierte.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zum Versuch im Schulstudio.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten formulierte über den Versuch im Schulstudio.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about the school-studio trial.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about the school-studio trial based on the data.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about the school-studio trial.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the school-studio trial.",
        },
        {
          isCorrect: false,
          label: "Based on the data, reached about the school-studio trial.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, menarik tentang uji di studio rekaman sekolah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
