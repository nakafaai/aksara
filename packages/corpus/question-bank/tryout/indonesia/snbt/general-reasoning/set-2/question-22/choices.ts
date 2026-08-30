import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das neue System verkürzt die Wartezeit ausnahmslos an jedem Tag.",
      value: false,
    },
    {
      label:
        "Das neue System führte an den meisten Testtagen zu kürzeren medianen Wartezeiten.",
      value: true,
    },
    {
      label:
        "Der zusätzliche Schalter war die einzige Ursache der Veränderung.",
      value: false,
    },
    {
      label:
        "Der vierte Tag beweist, dass das System grundsätzlich unwirksam ist.",
      value: false,
    },
    {
      label:
        "Die Wartezeit sank im Durchschnitt an jedem Tag um genau zwölf Minuten.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "The new system reduces waiting time on every day without exception.",
      value: false,
    },
    {
      label:
        "The new system coincided with shorter median waits on most trial days.",
      value: true,
    },
    {
      label: "An extra service desk was the sole cause of the change.",
      value: false,
    },
    {
      label: "The fourth day proves the system is generally ineffective.",
      value: false,
    },
    {
      label:
        "Waiting time fell by exactly twelve minutes on average every day.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Sistem baru selalu mempersingkat waktu tunggu tanpa pengecualian.",
      value: false,
    },
    {
      label:
        "Sistem baru berkaitan dengan median waktu tunggu yang lebih singkat pada sebagian besar hari uji.",
      value: true,
    },
    {
      label: "Penambahan loket adalah satu-satunya penyebab perubahan.",
      value: false,
    },
    {
      label:
        "Hari keempat membuktikan bahwa sistem tersebut tidak efektif secara umum.",
      value: false,
    },
    {
      label: "Waktu tunggu turun tepat dua belas menit setiap hari.",
      value: false,
    },
  ],
};

export default choices;
