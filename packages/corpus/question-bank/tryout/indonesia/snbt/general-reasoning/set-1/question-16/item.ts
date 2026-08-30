import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Instantnudeln liefern bei täglichem Verzehr alle Nährstoffe, die der Körper benötigt.",
        },
        {
          isCorrect: true,
          label:
            "Instantnudeln sollten nur gelegentlich gegessen und mit weniger Würzmischung sowie mit Gemüse und Protein ergänzt werden.",
        },
        {
          isCorrect: false,
          label:
            "Durch den Austausch des Kochwassers verschwindet sämtliches Natrium aus den Instantnudeln.",
        },
        {
          isCorrect: false,
          label: "Olivenöl macht unbegrenzte Portionen Instantnudeln gesund.",
        },
        {
          isCorrect: false,
          label:
            "Gemüse hebt den Natriumgehalt der Würzmischung vollständig auf.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Instant noodles provide every nutrient the body needs when eaten daily.",
        },
        {
          isCorrect: true,
          label:
            "Instant noodles are best treated as an occasional meal, with less seasoning and added vegetables and protein.",
        },
        {
          isCorrect: false,
          label:
            "Replacing the cooking water removes all sodium from instant noodles.",
        },
        {
          isCorrect: false,
          label:
            "Cooking instant noodles with olive oil makes unlimited portions healthy.",
        },
        {
          isCorrect: false,
          label:
            "Adding vegetables completely cancels the sodium in the seasoning.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mie instan menyediakan seluruh zat gizi yang dibutuhkan tubuh jika dimakan setiap hari.",
        },
        {
          isCorrect: true,
          label:
            "Mie instan sebaiknya dikonsumsi sesekali, dengan bumbu yang dikurangi serta tambahan sayuran dan protein.",
        },
        {
          isCorrect: false,
          label:
            "Mengganti air rebusan menghilangkan seluruh natrium dari mie instan.",
        },
        {
          isCorrect: false,
          label:
            "Memasak mie instan dengan minyak zaitun membuat porsi tanpa batas menjadi sehat.",
        },
        {
          isCorrect: false,
          label:
            "Menambahkan sayuran sepenuhnya meniadakan natrium dalam bumbu.",
        },
      ],
    },
  },
};

export default item;
