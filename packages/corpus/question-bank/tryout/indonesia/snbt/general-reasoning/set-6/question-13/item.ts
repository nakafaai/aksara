import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Handelspartner haben die Ausfuhren des Landes bereits beschränkt.",
        },
        {
          isCorrect: false,
          label:
            "Ein Handelsurteil hat den Rückgang der Erzeugerpreise unmittelbar verursacht.",
        },
        {
          isCorrect: false,
          label:
            "Vergeltungsmaßnahmen sind der einzige Faktor, der die Handelsbilanz bestimmt.",
        },
        {
          isCorrect: false,
          label:
            "Die vorgeschlagenen Hühnerimporte sind bereits auf den heimischen Markt gelangt.",
        },
        {
          isCorrect: true,
          label: "Unabhängige Geflügelbetriebe haben Verluste erlitten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Trading partners have already restricted the country's exports.",
        },
        {
          isCorrect: false,
          label: "A trade ruling directly caused the farm-gate price decline.",
        },
        {
          isCorrect: false,
          label:
            "Retaliation is the only factor that determines the trade balance.",
        },
        {
          isCorrect: false,
          label:
            "The proposed chicken imports have already entered the local market.",
        },
        {
          isCorrect: true,
          label: "Independent chicken farmers suffered losses.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mitra dagang telah membatasi ekspor negara tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Sebuah putusan dagang secara langsung menyebabkan penurunan harga di tingkat peternak.",
        },
        {
          isCorrect: false,
          label:
            "Retaliasi merupakan satu-satunya faktor yang menentukan neraca perdagangan.",
        },
        {
          isCorrect: false,
          label: "Impor ayam yang diusulkan telah masuk ke pasar lokal.",
        },
        { isCorrect: true, label: "Peternak ayam mandiri mengalami kerugian." },
      ],
    },
  },
};

export default item;
