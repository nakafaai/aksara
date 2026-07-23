import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsLinearEquationInequalityMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/linear-equation-inequality",
    domain: "mathematics",
    key: "lesson.mathematics.linear-equation-inequality",
    kind: "lesson",
    routeSlugs: {
      en: "linear-equation-inequality",
      id: "sistem-persamaan-dan-pertidaksamaan-linear",
    },
    sections: [
      {
        routeSlugs: {
          en: "system-linear-equation",
          id: "sistem-persamaan-linear",
        },
        slug: "system-linear-equation",
        translations: {
          en: {
            title: "Linear Equation Systems",
          },
          id: {
            title: "Sistem Persamaan Linear",
          },
        },
      },
      {
        routeSlugs: {
          en: "system-linear-inequality",
          id: "sistem-pertidaksamaan-linear",
        },
        slug: "system-linear-inequality",
        translations: {
          en: {
            title: "Linear Inequality Systems",
          },
          id: {
            title: "Sistem Pertidaksamaan Linear",
          },
        },
      },
    ],
    slug: "linear-equation-inequality",
    translations: {
      en: {
        description: "Solve linear systems with substitution and elimination.",
        title: "Systems of Linear Equations and Inequalities",
      },
      id: {
        description: "Selesaikan sistem linear dengan dua cara utama.",
        title: "Sistem Persamaan dan Pertidaksamaan Linear",
      },
    },
  });
