import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zum Ortsformular",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zum Ortsformular",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zum Ortsformular",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zum Ortsformular",
        },
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zum Ortsformular",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the team's follow up study of the location form",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of the location form",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of the location form",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of the location form",
        },
        {
          isCorrect: true,
          label: "the team's follow-up study of the location form",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji formulir lokasi",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji formulir lokasi",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji formulir lokasi",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji formulir lokasi",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji formulir lokasi",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
