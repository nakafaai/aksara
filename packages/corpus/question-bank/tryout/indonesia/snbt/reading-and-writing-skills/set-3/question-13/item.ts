import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zu den Reihenfolgekarten",
        },
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zu den Reihenfolgekarten",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zu den Reihenfolgekarten",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zu den Reihenfolgekarten",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zu den Reihenfolgekarten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "the team's follow-up study of the sequencing cards",
        },
        {
          isCorrect: false,
          label: "the team's follow up study of the sequencing cards",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of the sequencing cards",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of the sequencing cards",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of the sequencing cards",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kerja sama tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerjasama tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam pengujian kartu urutan bahan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
