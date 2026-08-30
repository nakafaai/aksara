import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ein Delir kann auch bei anderen akuten Erkrankungen als COVID-19 auftreten.",
        },
        {
          isCorrect: true,
          label: "Jeder Mensch mit Delir muss mit SARS-CoV-2 infiziert sein.",
        },
        {
          isCorrect: false,
          label:
            "Bei manchen älteren Menschen mit COVID-19 kann ein Delir auftreten.",
        },
        {
          isCorrect: false,
          label: "Ein Delir beginnt akut und seine Anzeichen können schwanken.",
        },
        {
          isCorrect: false,
          label:
            "Bei einem möglichen Delir sollte die zugrunde liegende Ursache abgeklärt werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Delirium can occur in acute illnesses other than COVID-19.",
        },
        {
          isCorrect: true,
          label:
            "Everyone who experiences delirium must be infected with SARS-CoV-2.",
        },
        {
          isCorrect: false,
          label: "Some older adults with COVID-19 may present with delirium.",
        },
        {
          isCorrect: false,
          label: "Delirium develops acutely and its signs can fluctuate.",
        },
        {
          isCorrect: false,
          label:
            "Possible delirium should be assessed for an underlying cause.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Delirium dapat terjadi pada penyakit akut selain COVID-19.",
        },
        {
          isCorrect: true,
          label:
            "Setiap orang yang mengalami delirium pasti terinfeksi SARS-CoV-2.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian orang lanjut usia dengan COVID-19 dapat mengalami delirium.",
        },
        {
          isCorrect: false,
          label:
            "Delirium muncul secara akut dan tanda-tandanya dapat berfluktuasi.",
        },
        {
          isCorrect: false,
          label:
            "Dugaan delirium perlu diperiksa untuk mencari penyebab dasarnya.",
        },
      ],
    },
  },
};

export default item;
