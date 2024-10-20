import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

const ARTICLE_URL = 'https://www.marca.com/mx/motor/formula-1/2024/10/20/6714316fe2704ef78b8b457b.html'

const res = await fetch(ARTICLE_URL)
const buffer = await res.arrayBuffer()
const text = new TextDecoder('utf-8').decode(buffer)

const doc = new JSDOM(text, { ARTICLE_URL })
const reader = new Readability(doc.window.document)
const { title, byline, lang, excerpt, siteName, textContent } = reader.parse()

console.log({ title, byline, lang, excerpt, siteName, textContent })