import { readFileSync, writeFileSync } from 'node:fs'

// Keep the public, script-free policy in sync with the site's Vue policy.
const page = readFileSync(new URL('../src/pages/PrivacyPage.vue', import.meta.url), 'utf8')
const match = page.match(/<template>\s*([\s\S]*?)\s*<TerminalPrompt/)
if (!match) throw new Error('Privacy page structure changed; review the static policy export')
const body = match[1]
  .replace('<RouterLink to="/games"', '<a href="/#/games"')
  .replaceAll('</RouterLink>', '</a>')
if (/\{\{|<RouterLink|<script|v-if|v-for/.test(body)) {
  throw new Error('Static privacy export contains dynamic content; update the exporter')
}
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Privacy policy — Mezeman</title>
<style>
body{margin:0;background:#0a0a0a;color:#c2d4c2;font:16px/1.65 system-ui,sans-serif}
main{max-width:850px;margin:auto;padding:32px 22px}
h1,h2,a{color:#68f08b}h2{font-size:1.15rem;margin-top:1.8rem}
li{margin:.7rem 0}ul{padding-left:1.3rem}a{overflow-wrap:anywhere}
.text-terminal-dimgreen{color:#a0e5af}.text-xs{font-size:.85rem}
.border-b{border-bottom:1px solid #28432e}.pb-3{padding-bottom:1rem}
</style></head><body><main><h1>Privacy policy</h1>${body}</div></main></body></html>
`
writeFileSync(new URL('../../privacy-policy.html', import.meta.url), html)
console.log('Generated privacy-policy.html from PrivacyPage.vue')
