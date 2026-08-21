import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Handelspartner haben die Ausfuhren des Landes bereits beschränkt.",
      value: false,
    },
    {
      label:
        "Ein Handelsurteil hat den Rückgang der Erzeugerpreise unmittelbar verursacht.",
      value: false,
    },
    {
      label:
        "Vergeltungsmaßnahmen sind der einzige Faktor, der die Handelsbilanz bestimmt.",
      value: false,
    },
    {
      label:
        "Die vorgeschlagenen Hühnerimporte sind bereits auf den heimischen Markt gelangt.",
      value: false,
    },
    {
      label: "Unabhängige Geflügelbetriebe haben Verluste erlitten.",
      value: true,
    },
  ],
  en: [
    {
      label: "Trading partners have already restricted the country's exports.",
      value: false,
    },
    {
      label: "A trade ruling directly caused the farm-gate price decline.",
      value: false,
    },
    {
      label:
        "Retaliation is the only factor that determines the trade balance.",
      value: false,
    },
    {
      label:
        "The proposed chicken imports have already entered the local market.",
      value: false,
    },
    { label: "Independent chicken farmers suffered losses.", value: true },
  ],
  id: [
    {
      label: "Mitra dagang telah membatasi ekspor negara tersebut.",
      value: false,
    },
    {
      label:
        "Sebuah putusan dagang secara langsung menyebabkan penurunan harga di tingkat peternak.",
      value: false,
    },
    {
      label:
        "Retaliasi merupakan satu-satunya faktor yang menentukan neraca perdagangan.",
      value: false,
    },
    {
      label: "Impor ayam yang diusulkan telah masuk ke pasar lokal.",
      value: false,
    },
    { label: "Peternak ayam mandiri mengalami kerugian.", value: true },
  ],
};

export default choices;
