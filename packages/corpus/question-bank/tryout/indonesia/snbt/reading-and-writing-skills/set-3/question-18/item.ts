import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten eine begrenzte Schlussfolgerung für den Kontext Kompostierworkshop.",
        },
        {
          isCorrect: true,
          label:
            "Auf Grundlage der Daten formulierte das Team eine begrenzte Schlussfolgerung zu folgendem Kontext: Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten kam das Team zu einer Schlussfolgerung, die begrenzt war, im Kontext Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten führten zu einer begrenzten Schlussfolgerung, weil Kontext Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Auf Grundlage der Daten zog es eine begrenzte Schlussfolgerung für den Kontext Kompostierworkshop.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Based on the data, a limited conclusion for this setting (composting workshop).",
        },
        {
          isCorrect: true,
          label:
            "Based on the data, the team reached a limited conclusion for this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, the team reached a conclusion, which was limited, in this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "The data led to a limited conclusion because this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "Based on the data, it reached a limited conclusion for this setting (composting workshop).",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas untuk konteks lokakarya pembuatan kompos.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, tim sampai pada simpulan, yang terbatas, dalam konteks lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Data menghasilkan simpulan terbatas karena konteks lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, hal itu menarik simpulan terbatas untuk konteks lokakarya pembuatan kompos.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
