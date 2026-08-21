import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Interesse am Basketball steigt mit jeder Klassenstufe",
      value: false,
    },
    {
      label: "Tanz hat beste Aussichten, weil das Interesse immer größer wird",
      value: false,
    },
    {
      label:
        "Die Malerei hat beste Aussichten, da das Interesse immer größer wird",
      value: false,
    },
    {
      label: "In jeder Klassenstufe ist Singen das am wenigsten beliebte Hobby",
      value: false,
    },
    {
      label:
        "Schauspiel ist bei den Schülern am wenigsten beliebt, da es in jeder Jahrgangsstufe immer die wenigsten Teilnehmer gibt",
      value: true,
    },
  ],
  en: [
    {
      label: "Interest in basketball increases at every grade level",
      value: false,
    },
    {
      label:
        "Dance has the best prospects because interest is always increasing",
      value: false,
    },
    {
      label:
        "Painting has the best prospects because interest is always increasing",
      value: false,
    },
    {
      label: "In every grade level, singing is the least popular hobby",
      value: false,
    },
    {
      label:
        "Acting is the least popular among students because it always has the fewest participants in every grade",
      value: true,
    },
  ],
  id: [
    {
      label: "Peminat bola basket meningkat pada setiap jenjang kelas",
      value: false,
    },
    {
      label:
        "Seni tari memiliki prospek paling baik karena peminatnya selalu meningkat",
      value: false,
    },
    {
      label:
        "Seni lukis memiliki prospek paling baik karena peminatnya selalu meningkat",
      value: false,
    },
    {
      label:
        "Di setiap jenjang kelas, menyanyi menjadi kegemaran yang paling sedikit peminatnya",
      value: false,
    },
    {
      label:
        "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
      value: true,
    },
  ],
};

export default choices;
