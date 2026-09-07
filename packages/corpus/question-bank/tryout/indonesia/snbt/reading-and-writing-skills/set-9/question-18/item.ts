import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung zu den Proberäumen.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu den Proberäumen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team, das auf Grundlage der Daten eine begrenzte Schlussfolgerung zu den Proberäumen formulierte.",
        },
        {
          isCorrect: false,
          label:
            "Weil das Team eine begrenzte Schlussfolgerung zu den Proberäumen formulierte.",
        },
        {
          isCorrect: false,
          label: "Auf Grundlage der Daten formulierte über die Proberäume.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion about the music practice rooms.",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion about the music practice rooms.",
        },
        {
          isCorrect: false,
          label:
            "The team that reached a limited conclusion about the music practice rooms based on the data.",
        },
        {
          isCorrect: false,
          label:
            "Because the team reached a limited conclusion about the music practice rooms.",
        },
        {
          isCorrect: false,
          label: "Based on the data, reached about the music practice rooms.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang ruang latihan musik.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
