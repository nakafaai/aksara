import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Lärmprotokoll.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zum Lärmprotokoll formulierte.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zum Lärmprotokoll.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zum Lärmprotokoll formulierte.",
        },
        {
          isCorrect: false,
          label: "Auf Grundlage der Daten formulierte über das Lärmprotokoll.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Based on the data, a limited conclusion about the noise log.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about the noise log based on the data.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the noise log.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about the noise log.",
        },
        {
          isCorrect: false,
          label: "Based on the data, reached about the noise log.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang pencatatan kebisingan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
