// scripts/generate-client-enums.ts
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { Roles } from 'prisma/client'

const enumToExport = {
  Roles: Object.entries(Roles).reduce(
    (acc, [key, value]) => {
      acc[key] = value
      return acc
    },
    {} as Record<string, string>,
  ),
}

const content = `// ! Auto-generated from Prisma enums. Do not edit manually.
export const Roles = ${JSON.stringify(enumToExport.Roles, null, 2)} as const

export type Role = keyof typeof Roles
`

const outputPath = resolve(__dirname, '../src/types/enums.ts')
writeFileSync(outputPath, content)
console.log(`✅ Generated client enums at ${outputPath}`)
