import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nach gleichen Stellenzahlen und Öffnungszeiten bleiben die Rückgabequoten im gesamten Gelände hoch.",
        },
        {
          isCorrect: false,
          label:
            "An einem Eingang warten Besucher länger, weil die Pfandrückgabe dort einzeln geprüft wird, während die Abfallmenge unverändert erfasst wird.",
        },
        {
          isCorrect: false,
          label:
            "Die Abschlussbewertung wird Reinigungskosten und verlorene Behälter berücksichtigen.",
        },
        {
          isCorrect: true,
          label:
            "Die Abfallreduktion entstand durch ein gleichzeitig geltendes Verbot von Einwegbehältern.",
        },
        {
          isCorrect: false,
          label: "Eine Rückgabestelle wurde verlegt und länger geöffnet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "After desk numbers and hours are equalised, return rates remain high across the site.",
        },
        {
          isCorrect: false,
          label:
            "Visitors at one entrance wait longer because deposits are verified individually there, while the amount of waste is recorded in the same way.",
        },
        {
          isCorrect: false,
          label:
            "The final evaluation will include washing costs and lost containers.",
        },
        {
          isCorrect: true,
          label:
            "The waste reduction resulted from a simultaneous ban on single-use containers.",
        },
        {
          isCorrect: false,
          label: "One return desk was moved and its hours were extended.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah jumlah dan jam loket disamakan, tingkat pengembalian tetap tinggi di seluruh area.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung di satu pintu menunggu lebih lama karena pengembalian deposit diperiksa satu per satu, sedangkan jumlah sampah dicatat dengan cara yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          isCorrect: true,
          label:
            "Pengurangan sampah ternyata berasal dari larangan membawa wadah sekali pakai yang berlaku bersamaan.",
        },
        {
          isCorrect: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
