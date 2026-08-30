import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Instantnudeln liefern bei täglichem Verzehr alle Nährstoffe, die der Körper benötigt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Instantnudeln sollten nur gelegentlich gegessen und mit weniger Würzmischung sowie mit Gemüse und Protein ergänzt werden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Durch den Austausch des Kochwassers verschwindet sämtliches Natrium aus den Instantnudeln.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Olivenöl macht unbegrenzte Portionen Instantnudeln gesund.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gemüse hebt den Natriumgehalt der Würzmischung vollständig auf.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Instant noodles provide every nutrient the body needs when eaten daily.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Instant noodles are best treated as an occasional meal, with less seasoning and added vegetables and protein.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Replacing the cooking water removes all sodium from instant noodles.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Cooking instant noodles with olive oil makes unlimited portions healthy.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Adding vegetables completely cancels the sodium in the seasoning.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mie instan menyediakan seluruh zat gizi yang dibutuhkan tubuh jika dimakan setiap hari.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mie instan sebaiknya dikonsumsi sesekali, dengan bumbu yang dikurangi serta tambahan sayuran dan protein.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengganti air rebusan menghilangkan seluruh natrium dari mie instan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Memasak mie instan dengan minyak zaitun membuat porsi tanpa batas menjadi sehat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menambahkan sayuran sepenuhnya meniadakan natrium dalam bumbu.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
