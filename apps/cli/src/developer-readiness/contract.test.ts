import { describe, expect, it } from "@nakafa/testing/effect";
import { Schema } from "effect";
import {
  DeveloperNpmPackageSchema,
  DeveloperOpenApiSchema,
} from "#cli/developer-readiness/contract";
import { DEVELOPER_NPM_BODY, DEVELOPER_OPENAPI_BODY } from "#test/developer";

const isOpenApi = Schema.is(DeveloperOpenApiSchema);
const isNpmPackage = Schema.is(DeveloperNpmPackageSchema);

describe("developer release contracts", () => {
  it("accepts every advertised REST operation and the executable package", () => {
    expect(isOpenApi(DEVELOPER_OPENAPI_BODY)).toBe(true);
    expect(isNpmPackage(DEVELOPER_NPM_BODY)).toBe(true);
  });

  it.each(Object.keys(DEVELOPER_OPENAPI_BODY.paths))(
    "requires the advertised %s operation",
    (path) => {
      const paths = Object.fromEntries(
        Object.entries(DEVELOPER_OPENAPI_BODY.paths).filter(
          ([candidate]) => candidate !== path
        )
      );
      expect(isOpenApi({ ...DEVELOPER_OPENAPI_BODY, paths })).toBe(false);
      expect(
        isOpenApi({
          ...DEVELOPER_OPENAPI_BODY,
          paths: {
            ...DEVELOPER_OPENAPI_BODY.paths,
            [path]: { get: { operationId: "wrongOperation" } },
          },
        })
      ).toBe(false);
    }
  );

  it("rejects packages without the documented binary and Node engine", () => {
    const { bin: _bin, ...withoutBinary } = DEVELOPER_NPM_BODY;
    expect(isNpmPackage(withoutBinary)).toBe(false);
    expect(
      isNpmPackage({
        ...DEVELOPER_NPM_BODY,
        engines: { node: ">=20" },
      })
    ).toBe(false);
  });
});
