#!/usr/bin/env bun
import { existsSync } from "fs"
import { mkdir, rm } from "fs/promises"
import path from "path"
import bunPluginTailwind from "bun-plugin-tailwind"

console.log("\n🏗️  Building local-components library...\n")

const start = performance.now()

// Clean dist directory
const outdir = path.join(process.cwd(), "dist")
if (existsSync(outdir)) {
  console.log(`🗑️  Cleaning ${outdir}`)
  await rm(outdir, { recursive: true, force: true })
}

// Find all entry points
const componentEntries = [...new Bun.Glob("src/components/*/*.tsx").scanSync()]
  .map((f) => path.resolve(f))
  .filter((f) => !f.includes("stories.tsx"))
const libEntries = [...new Bun.Glob("src/lib/**/*.ts*").scanSync()].map((f) => path.resolve(f))
const allEntries = [...componentEntries, ...libEntries]

console.log(`📦 Found ${componentEntries.length} components and ${libEntries.length} lib modules`)

// Build each entry point individually to maintain structure
const buildPromises = allEntries.map(async (entry) => {
  const relativePath = path.relative(process.cwd(), entry)
  const outputDir = path.join(outdir, path.dirname(relativePath).replace("src/", "").replace("/index.ts", ""))

  // Create output directory
  await mkdir(outputDir, { recursive: true })

  // Build with Bun
  const result = await Bun.build({
    entrypoints: [entry],
    plugins: [bunPluginTailwind],
    outdir: outputDir,
    format: "esm",
    target: "browser",
    external: ["react", "react-dom", "react/jsx-runtime", "class-variance-authority", "clsx", "tailwind-merge"],
    minify: true,
    sourcemap: "linked",
  })

  if (!result.success) {
    console.error(`❌ Failed to build ${relativePath}`)
    result.logs.forEach((log) => console.error(log))
    return false
  }

  console.log(`✅ Built ${path.relative(outdir, outputDir)}`)
  return true
})

const results = await Promise.all(buildPromises)

if (!results.every(Boolean)) {
  console.error("\n❌ Build failed")
  process.exit(1)
}

const end = performance.now()
console.log(`\n✅ Library JS build completed in ${(end - start).toFixed(2)}ms\n`)

// Generate TypeScript declarations using tsgo with project mode
console.log("📝 Generating TypeScript declarations with tsgo...")
const tsgoStart = performance.now()

const tsgo = Bun.spawn(["tsgo", "--project", "tsconfig.build.json"], {
  stdout: "inherit",
  stderr: "inherit",
})

const tsgoExit = await tsgo.exited
const tsgoEnd = performance.now()

if (tsgoExit !== 0) {
  console.error("\n❌ TypeScript declaration generation failed")
  process.exit(1)
}

console.log(`✅ Declarations generated in ${(tsgoEnd - tsgoStart).toFixed(2)}ms`)

console.log("\n📊 Build Summary:")
console.log(`   Components: ${componentEntries.length}`)
console.log(`   Lib modules: ${libEntries.length}`)
console.log(`   JS build time: ${(end - start).toFixed(2)}ms`)
console.log(`   Declaration time: ${(tsgoEnd - tsgoStart).toFixed(2)}ms`)
console.log(`   Total time: ${(end - start + (tsgoEnd - tsgoStart)).toFixed(2)}ms`)
console.log("\n🎉 Library build complete!\n")
