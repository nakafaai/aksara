import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

describe("package verification", () => {
  it("proves the real tarball and exercises package-owned lifecycle helpers", async () => {
    const originalArguments = process.argv;
    process.argv = [process.execPath, "verify-package.ts"];
    const verifier = await import("#scripts/verify-package");
    process.argv = originalArguments;

    expect(verifier.publicSpecifier("@nakafa/aksara-contracts", ".")).toBe(
      "@nakafa/aksara-contracts"
    );
    expect(
      verifier.publicSpecifier(
        "@nakafa/aksara-contracts",
        "./renderer/manifest"
      )
    ).toBe("@nakafa/aksara-contracts/renderer/manifest");

    const root = mkdtempSync(join(tmpdir(), "aksara-preserve-test-"));
    const tarball = join(root, "source.tgz");
    const output = join(root, "nested", "output.tgz");
    writeFileSync(tarball, "verified");
    const write = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);

    verifier.preserveTarball(undefined, "unused");
    verifier.preserveTarball(output, tarball);

    expect(readFileSync(output, "utf8")).toBe("verified");
    expect(write).toHaveBeenCalledWith(
      `Preserved the verified tarball at ${output}.\n`
    );
    verifier.removeVerifierRoot(root);
    expect(existsSync(root)).toBe(false);
    write.mockRestore();
  }, 120_000);
});
