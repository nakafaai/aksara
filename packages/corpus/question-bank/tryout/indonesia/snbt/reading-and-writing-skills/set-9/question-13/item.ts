import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zum Digitalplan",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zum Digitalplan",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zum Digitalplan",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zum Digitalplan",
        },
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zum Digitalplan",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the team's follow up study of the digital schedule",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of the digital schedule",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of the digital schedule",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of the digital schedule",
        },
        {
          isCorrect: true,
          label: "the team's follow-up study of the digital schedule",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji jadwal digital",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji jadwal digital",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji jadwal digital",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji jadwal digital",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji jadwal digital",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
