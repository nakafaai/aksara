import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zu den Genre-Schildern",
        },
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zu den Genre-Schildern",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zu den Genre-Schildern",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zu den Genre-Schildern",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zu den Genre-Schildern",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "the team's follow-up study of genre signs",
        },
        {
          isCorrect: false,
          label: "the team's follow up study of genre signs",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of genre signs",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of genre signs",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of genre signs",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji tanda genre",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
