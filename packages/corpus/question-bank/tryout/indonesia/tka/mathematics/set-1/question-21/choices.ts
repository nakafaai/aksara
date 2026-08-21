import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Indem gezeigt wird, dass das Skalarprodukt des Positionsvektors A und des Richtungsvektors der Tangente an A positiv ist.",
      value: false,
    },
    {
      label:
        "Indem wir zeigen, dass das Kreuzprodukt des Positionsvektors A und des Richtungsvektors der Tangente an A der Nullvektor ist.",
      value: false,
    },
    {
      label:
        "Indem wir zeigen, dass das Skalarprodukt des Positionsvektors A und des Richtungsvektors der Tangente an A Null ist.",
      value: true,
    },
    {
      label:
        "Indem man zeigt, dass der Positionsvektor A und der Richtungsvektor der Tangente an A die gleiche Richtung haben.",
      value: false,
    },
    {
      label:
        "Indem man zeigt, dass der Ortsvektor A und der Richtungsvektor der Tangente an A die gleiche Länge haben.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "By showing that the dot product of position vector A and the direction vector of the tangent line at A is positive.",
      value: false,
    },
    {
      label:
        "By showing that the cross product of position vector A and the direction vector of the tangent line at A is the zero vector.",
      value: false,
    },
    {
      label:
        "By showing that the dot product of position vector A and the direction vector of the tangent line at A is zero.",
      value: true,
    },
    {
      label:
        "By showing that position vector A and the direction vector of the tangent line at A have the same direction.",
      value: false,
    },
    {
      label:
        "By showing that position vector A and the direction vector of the tangent line at A have the same length.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Dengan menunjukkan bahwa hasil kali titik vektor posisi A dan vektor arah garis singgung di A adalah positif.",
      value: false,
    },
    {
      label:
        "Dengan menunjukkan bahwa hasil kali silang vektor posisi A dan vektor arah garis singgung di A adalah vektor nol.",
      value: false,
    },
    {
      label:
        "Dengan menunjukkan bahwa hasil kali titik vektor posisi A dan vektor arah garis singgung di A adalah nol.",
      value: true,
    },
    {
      label:
        "Dengan menunjukkan bahwa vektor posisi A dan vektor arah garis singgung di A memiliki arah yang sama.",
      value: false,
    },
    {
      label:
        "Dengan menunjukkan bahwa vektor posisi A dan vektor arah garis singgung di A memiliki panjang yang sama.",
      value: false,
    },
  ],
};

export default choices;
