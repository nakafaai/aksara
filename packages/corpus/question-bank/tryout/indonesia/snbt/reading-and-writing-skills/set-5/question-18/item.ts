import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung für den Kontext schulisches Tonstudio.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten kam das Team zu einer Schlussfolgerung, die begrenzt war, im Kontext schulisches Tonstudio.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten führten zu einer begrenzten Schlussfolgerung, weil Kontext schulisches Tonstudio.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu folgendem Kontext: Aufnahmestudio der Schule.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zog es eine begrenzte Schlussfolgerung für den Kontext schulisches Tonstudio.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion for this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, the team reached a conclusion, which was limited, in this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "The data led to a limited conclusion because this setting (school recording studio).",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion for this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, it reached a limited conclusion for this setting (school recording studio).",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas untuk konteks studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, tim sampai pada simpulan, yang terbatas, dalam konteks studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Data menghasilkan simpulan terbatas karena konteks studio rekaman sekolah.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, hal itu menarik simpulan terbatas untuk konteks studio rekaman sekolah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
