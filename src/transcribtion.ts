const cyrToGlagMapping: Map<string, string> = new Map(Object.entries({
  'а': 'ⰰ',
  'б': 'ⰱ',
  'в': 'ⰲ',
  'г': 'ⰳ',
  'д': 'ⰴ',
  'е': 'ⰵ',
  'ё': 'ⰵ',
  'ж': 'ⰶ',
  'з': 'ⰸ',
  'і': 'ⰺ',
  'ї': 'ⰺ',
  'и': 'ⰻ',
  'й': 'ⰼ',
  'к': 'ⰽ',
  'л': 'ⰾ',
  'м': 'ⰿ',
  'н': 'ⱀ',
  'о': 'ⱁ',
  'п': 'ⱂ',
  'р': 'ⱃ',
  'с': 'ⱄ',
  'т': 'ⱅ',
  'у': 'ⱆ',
  'ў': 'ⱆ',
  'ф': 'ⱇ',
  'х': 'ⱈ',
  'ц': 'ⱌ',
  'ч': 'ⱍ',
  'ш': 'ⱎ',
  'щ': 'ⱋ',
  'ъ': 'ⱏ',
  'ы': 'ⱏⰺ',
  'ь': 'ⱐ',
  'э': 'ⰵ',
  'ю': 'ⱓ',
  'я': 'ⱔ',
  'ѧ': 'ⱔ',
  'ѫ': 'ⱘ',
  'ѥ': 'ⰵ',
  'ѹ': 'ⱆ',
  'ꙗ': 'ⱔ',
  'ѩ': 'ⱗ',
  'ѭ': 'ⱙ',
  'ѣ': 'ⱑ',
  ',': ' ·',
  '.': ' ჻',
  '?': ' ;',
}))

function cyrToGlagToken(token: string): string | undefined {
  const tokenAsKey = token.toLowerCase()
  const outToken = cyrToGlagMapping.get(tokenAsKey)
  const isLowercase = token == tokenAsKey
  return isLowercase ? outToken : outToken?.toUpperCase()
}

interface GlagToCyrRule {
  letter: string,
  digraphs?: string[],
}

const glagToCyrMapping: Map<string, GlagToCyrRule> = new Map(Object.entries({
  'ⰰ': { letter: 'а', },
  'ⰱ': { letter: 'б', },
  'ⰲ': { letter: 'в', },
  'ⰳ': { letter: 'г', },
  'ⰴ': { letter: 'д', },
  'ⰵ': { letter: 'е', },
  'ⰶ': { letter: 'ж', },
  'ⰸ': { letter: 'з', },
  'ⰺ': { letter: 'і', },
  'ⰻ': { letter: 'и', },
  'ⰼ': { letter: 'й', }, 
  'ⱜ': { letter: 'й', digraphs: ['ⱜⱁ', 'ⱜⰰ', 'ⱜⰵ'] },
  'ⱜⱁ': { letter: 'ё', },
  'ⱜⰰ': { letter: 'я', },
  'ⱜⰵ': { letter: 'е', },
  'ⰽ': { letter: 'к', },
  'ⰾ': { letter: 'л', },
  'ⰿ': { letter: 'м', },
  'ⱀ': { letter: 'н', },
  'ⱁ': { letter: 'о', },
  'ⱂ': { letter: 'п', },
  'ⱃ': { letter: 'р', },
  'ⱄ': { letter: 'с', },
  'ⱅ': { letter: 'т', },
  'ⱆ': { letter: 'у', },
  'ⱇ': { letter: 'ф', },
  'ⱈ': { letter: 'х', },
  'ⱌ': { letter: 'ц', },
  'ⱍ': { letter: 'ч', },
  'ⱎ': { letter: 'ш', },
  'ⱋ': { letter: 'щ', },
  'ⱏ': { letter: 'ъ', digraphs: ['ⱏⰺ'] },
  'ⱏⰺ': { letter: 'ы', },
  'ⱐ': { letter: 'ь', },
  'ⱓ': { letter: 'ю', },
  'ⱔ': { letter: 'я', },
  'ⱘ': { letter: 'ѫ', },
  'ⱗ': { letter: 'ѩ', },
  'ⱙ': { letter: 'ѭ', },
  'ⱑ': { letter: 'ѣ', },
  '·': { letter: ',', },
  '჻': { letter: '.', },
  ';': { letter: '?', },
}))


export function cyrToGlag(text: string): string {
  return [...text]
    .map(token => cyrToGlagToken(token) ?? token)
    .join('')
}

export function glagToCyr(text: string): string {
  const chars = [...text]
  const result = []
  for (let i = 0; i < chars.length; i++) {
    const currentChar = chars[i]
    const isUppercase = currentChar == currentChar.toUpperCase()
    const rule = glagToCyrMapping.get(currentChar.toLowerCase())
    if (!rule) {
      result.push(currentChar)
      continue
    }
    const notLastEntry = i < chars.length - 1
    if (rule.digraphs && notLastEntry) {
      const nextChar = chars[i + 1]
      const matchingDigraph = rule.digraphs.find(digraph => {
        const digraphSecondChar = digraph.charAt(1)
        return digraphSecondChar == nextChar
      })
      if (matchingDigraph) {
        const resultToken = glagToCyrMapping.get(matchingDigraph)
        if (!resultToken) {
          throw new Error("Inconsistent rules table")
        }
        result.push(isUppercase ? resultToken.letter.toUpperCase() : resultToken.letter)
        i++
        continue
      }
    }
    result.push(isUppercase ? rule.letter.toUpperCase() : rule.letter)
  }
  return result.join('')
}