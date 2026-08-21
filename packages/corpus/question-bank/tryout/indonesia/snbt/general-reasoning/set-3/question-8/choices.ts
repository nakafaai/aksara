import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Ein Delir kann auch bei anderen akuten Erkrankungen als COVID-19 auftreten.",
      value: false,
    },
    {
      label: "Jeder Mensch mit Delir muss mit SARS-CoV-2 infiziert sein.",
      value: true,
    },
    {
      label:
        "Bei manchen älteren Menschen mit COVID-19 kann ein Delir auftreten.",
      value: false,
    },
    {
      label: "Ein Delir beginnt akut und seine Anzeichen können schwanken.",
      value: false,
    },
    {
      label:
        "Bei einem möglichen Delir sollte die zugrunde liegende Ursache abgeklärt werden.",
      value: false,
    },
  ],
  en: [
    {
      label: "Delirium can occur in acute illnesses other than COVID-19.",
      value: false,
    },
    {
      label:
        "Everyone who experiences delirium must be infected with SARS-CoV-2.",
      value: true,
    },
    {
      label: "Some older adults with COVID-19 may present with delirium.",
      value: false,
    },
    {
      label: "Delirium develops acutely and its signs can fluctuate.",
      value: false,
    },
    {
      label: "Possible delirium should be assessed for an underlying cause.",
      value: false,
    },
  ],
  id: [
    {
      label: "Delirium dapat terjadi pada penyakit akut selain COVID-19.",
      value: false,
    },
    {
      label:
        "Setiap orang yang mengalami delirium pasti terinfeksi SARS-CoV-2.",
      value: true,
    },
    {
      label:
        "Sebagian orang lanjut usia dengan COVID-19 dapat mengalami delirium.",
      value: false,
    },
    {
      label:
        "Delirium muncul secara akut dan tanda-tandanya dapat berfluktuasi.",
      value: false,
    },
    {
      label: "Dugaan delirium perlu diperiksa untuk mencari penyebab dasarnya.",
      value: false,
    },
  ],
};

export default choices;
