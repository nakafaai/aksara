import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "removing the word *Regarding* at the beginning of the sentence.",
      value: true,
    },
    {
      label: "adding the word *of* before the word *subsector*.",
      value: false,
    },
    {
      label: "replacing the word *share* with the word *portion*.",
      value: false,
    },
    {
      label: "removing the word *relatively*.",
      value: false,
    },
    {
      label: "adding the word *to* before the word *number*.",
      value: false,
    },
  ],
  id: [
    {
      label: "menghilangkan kata *mengenai* pada awal kalimat.",
      value: true,
    },
    {
      label: "menambahkan kata *daripada* sebelum kata *subsektor*.",
      value: false,
    },
    {
      label: "mengganti kata *share* dengan kata *andil*.",
      value: false,
    },
    {
      label: "menghilangkan kata *relatif*.",
      value: false,
    },
    {
      label: "menambah kata *terhadap* sebelum kata *jumlah*.",
      value: false,
    },
  ],
};

export default choices;
