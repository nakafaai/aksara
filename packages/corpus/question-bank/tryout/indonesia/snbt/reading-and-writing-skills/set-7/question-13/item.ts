import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zum Rückgabecode",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zum Rückgabecode",
        },
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zum Rückgabecode",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zum Rückgabecode",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zum Rückgabecode",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the team's follow up study of the return code",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of the return code",
        },
        {
          isCorrect: true,
          label: "the team's follow-up study of the return code",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of the return code",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of the return code",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji kode pengembalian",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji kode pengembalian",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji kode pengembalian",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji kode pengembalian",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji kode pengembalian",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
