import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zu Karten mit Gehzeiten",
        },
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zu Karten mit Gehzeiten",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zu Karten mit Gehzeiten",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zu Karten mit Gehzeiten",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zu Karten mit Gehzeiten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the team's follow up study of maps showing walking times",
        },
        {
          isCorrect: true,
          label: "the team's follow-up study of maps showing walking times",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of maps showing walking times",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of maps showing walking times",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of maps showing walking times",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji peta dengan waktu tempuh",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
