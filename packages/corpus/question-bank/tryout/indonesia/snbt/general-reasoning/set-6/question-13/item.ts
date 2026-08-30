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
              text: "Handelspartner haben die Ausfuhren des Landes bereits beschränkt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein Handelsurteil hat den Rückgang der Erzeugerpreise unmittelbar verursacht.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Vergeltungsmaßnahmen sind der einzige Faktor, der die Handelsbilanz bestimmt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die vorgeschlagenen Hühnerimporte sind bereits auf den heimischen Markt gelangt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Unabhängige Geflügelbetriebe haben Verluste erlitten.",
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
              text: "Trading partners have already restricted the country's exports.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A trade ruling directly caused the farm-gate price decline.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Retaliation is the only factor that determines the trade balance.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The proposed chicken imports have already entered the local market.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Independent chicken farmers suffered losses.",
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
              text: "Mitra dagang telah membatasi ekspor negara tersebut.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebuah putusan dagang secara langsung menyebabkan penurunan harga di tingkat peternak.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Retaliasi merupakan satu-satunya faktor yang menentukan neraca perdagangan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Impor ayam yang diusulkan telah masuk ke pasar lokal.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Peternak ayam mandiri mengalami kerugian." },
          ],
        },
      ],
    },
  },
};

export default item;
