import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zum Ausfüllbeispiel",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zum Ausfüllbeispiel",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zum Ausfüllbeispiel",
        },
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zum Ausfüllbeispiel",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zum Ausfüllbeispiel",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the team's follow up study of the timing example",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of the timing example",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of the timing example",
        },
        {
          isCorrect: true,
          label: "the team's follow-up study of the timing example",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of the timing example",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji contoh pencatatan waktu",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
